import React from 'react';
import {Image, View} from 'react-native';
import {GAMES} from '../../utils/games';

import logoImg from '../../assets/logo-nlw-esports.png';
import {GameCard} from '../../components/GameCard';
import {Heading} from '../../components/Heading';

import {styles} from './styles';
import {FlatList} from 'react-native';
import {ImageSourcePropType} from 'react-native';

interface GameCardProps {
  id: string;
  name: string;
  ads: string;
  cover: ImageSourcePropType;
}

export function Home() {
  const renderItem = ({item}: {item: GameCardProps}) => {
    return <GameCard data={item} />;
  };

  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={GAMES}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}
