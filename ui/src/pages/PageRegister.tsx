import { IonButtons, IonIcon, IonRow, IonGrid, IonCol, IonText, IonInput, IonCard, IonSlides, IonSlide, IonListHeader, IonButton, IonLabel, IonItem, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import React, { useState } from 'react';



const slideOpts = {
    initialSlide: 1,
    speed: 400
};


const PageRegister: React.FC = () => {

    const [email, setEmail] = useState<string>();
    const [text, setText] = useState<string>();
    const [password, setPassword] = useState<string>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>PokeTrader</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large" color="primary">POKETRADER</IonTitle>

                    </IonToolbar>
                </IonHeader>

            </IonContent>
        </IonPage >
    );
};

export default PageRegister;
