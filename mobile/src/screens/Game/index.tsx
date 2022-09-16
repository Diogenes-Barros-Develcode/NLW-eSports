import React, {useEffect, useState} from 'react';
import {GameParams} from '../../@types/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, TouchableOpacity, Image, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import {Background} from '../../components/Background';
import logoImg from '../../assets/logo-nlw-esports.png';
import chevronLeft from '../../assets/chevron-left.png';

import {styles} from './styles';
import {Heading} from '../../components/Heading';
import {DouCard, DuoCardProps} from '../../components/DouCard';
import {DuoMach} from '../../components/DuoMach';
import {Text} from 'react-native';

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('dsada');

  function handleGoBack() {
    navigation.goBack();
  }

  const renderItem = ({item}: {item: DuoCardProps}) => {
    return <DouCard data={item} onConnect={() => {}} />;
  };

  useEffect(() => {
    fetch(`http://172.22.19.61:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => {
        setDuos(data);
      })
      .catch(error => {
        console.log('Erro', error);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Image source={chevronLeft} style={styles.icon} />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

        <DuoMach
          visible={discordDuoSelected.length > 0}
          discord="diógenes"
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
