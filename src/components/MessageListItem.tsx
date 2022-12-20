import {
  IonItem,
  IonLabel,
  IonNote,
  IonReorder,
  ItemReorderEventDetail
  } from '@ionic/react';
import { Row } from '../data/seedRows';
import './MessageListItem.css';

interface MessageListItemProps {
  message: Row;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  
  return (
    <IonItem routerLink={`/message/${message.name}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {message.isGroupHeader}
        </h2>
        <h3>{message.text}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </IonLabel>
      <IonReorder slot="end" />
    </IonItem>
  );
};

export default MessageListItem;
