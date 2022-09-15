import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';

import {styles} from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import {GameCard} from '../../components/GameCard';
import {Heading} from '../../components/Heading';
import {Background} from '../../components/Background';
import {useNavigation} from '@react-navigation/native';

interface GameCardProps {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  function handleOpenScreenGame({id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('Game', {id, title, bannerUrl});
  }

  const renderItem = ({item}: {item: GameCardProps}) => {
    return <GameCard data={item} onPress={() => handleOpenScreenGame(item)} />;
  };

  useEffect(() => {
    fetch('http://172.22.19.61:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      })
      .catch(error => {
        console.log('Erro', error);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
