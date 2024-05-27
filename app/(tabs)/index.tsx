import { Image, StyleSheet, Platform, View, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { FirestoreError, collection, doc, getDocs, addDoc } from "firebase/firestore"; 
import { db } from '@/FirebaseConfig';
import { useEffect, useState } from 'react';

interface Mood {
  id: string; // Firestore document ID
  mood: 'good' | 'bad' | 'neutral'; // Assuming your moods have a 'name' field
}

export default function HomeScreen() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [selectedMood, setSelectedMood] = useState<Mood['mood'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const handleMoodSelect = (mood: Mood['mood']) => {
    setSelectedMood(mood);
  };

  const saveMood = async () => {
    if (selectedMood) {
      try {
        await addDoc(collection(db, 'moodos'), { mood: selectedMood });
        // add a toast here 
        setSelectedMood(null);
      } catch (error: any) {
        console.error('Error adding document: ', error);
        setError(error);
      }
    }
  };

  useEffect(() => {

    const fetchMoods = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'moods'));
        const moodData: Mood[] = [];
        querySnapshot.forEach((doc) => {
          moodData.push({ id: doc.id, mood: doc.data().mood });
        });
        setMoods(moodData);
        
      } catch (error: any) {
        setError(error);
      }
    }
    fetchMoods();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <View>
          {
            loading ? <ThemedText>Loading...</ThemedText> :
            error ? <ThemedText>Error: {error}</ThemedText> :
            moods.length > 0 ? moods.map(mood => (
              <ThemedText key={mood.id}>Mood: {mood.mood}</ThemedText>
            )) : <ThemedText>No moods found</ThemedText>
          }
        </View>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <View>
          <ThemedText type="subtitle">How are you feeling today?</ThemedText>
          <Button title="Good" onPress={() => handleMoodSelect('good')} />
          <Button title="Bad" onPress={() => handleMoodSelect('bad')} />
          <Button title="Neutral" onPress={() => handleMoodSelect('neutral')} />

          <Button title="Save Mood" onPress={saveMood} disabled={!selectedMood} />
        </View>
      </ThemedView>
      <Link href='/register'>Register</Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
