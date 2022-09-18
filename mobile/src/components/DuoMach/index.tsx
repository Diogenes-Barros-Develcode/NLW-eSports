import React from 'react';
import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import {styles} from './styles';
import close from '../../assets/close.png';
import checked from '../../assets/checked.png';
import {Heading} from '../Heading';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMach({discord, onClose, ...rest}: Props) {
  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <Image source={close} style={styles.icon} />
          </TouchableOpacity>

          <Image source={checked} style={styles.iconSuccess} />

          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={styles.heading}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity onPress={onClose} style={styles.discordButton}>
            <Text style={styles.discord}>{discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
