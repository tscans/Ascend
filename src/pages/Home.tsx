import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
IonSpinner } from '@ionic/react';
import React from 'react';
import './Home.css';
import vault from '../vault/vault';
import {RouteComponentProps} from 'react-router';

interface MyProps extends RouteComponentProps<{}> {}

class Home extends React.Component<MyProps>{
    state = {
        userInfo:null
    }
    componentDidMount(){
        this.grabUser()
    }
    render(){
        console.log(this.state);
        if(!this.state.userInfo){
            return(
                <IonSpinner name="crescent" />
            )
        }
        return(
            <IonPage>
                <IonContent fullscreen>
                    <IonHeader>
                    <IonToolbar>
                        <IonTitle>Ascend</IonTitle>
                    </IonToolbar>
                    </IonHeader>

                </IonContent>
            </IonPage>
        )
    }
    grabUser = () =>{
        let user = vault.getUser();
        if(!user){
            this.props.history.push("/");
        }else{
            this.setState({userInfo:user});
        }
    }
}

export default Home;
