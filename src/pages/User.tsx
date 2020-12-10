import React from 'react';
import {IonPage,IonContent,IonHeader,IonToolbar,IonButtons,
IonBackButton,IonTitle,IonCard,IonCardHeader,IonCardTitle,
IonCardContent, IonCardSubtitle, IonButton,IonAlert} from '@ionic/react';
import vault from '../vault/vault';
import {RouteComponentProps} from 'react-router';

interface MyProps extends RouteComponentProps<{}> {}

class User extends React.Component<MyProps>{
    state = {
        userInfo:null,
        userData:null,
        showEdit:false,
        showDelWorkouts:false,
        showDelProfile:false
    }
    componentDidMount(){
        this.grabUser();
        this.grabUserData();
    }
    render(){
        if(!this.state.userInfo || !this.state.userData){
            return(<div/>);
        }
        let userInfo : any = this.state.userInfo;
        let userData : any = this.state.userData;

        return(
            <IonPage>
                <IonContent fullscreen>
                    <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/home" />
                        </IonButtons>
                        <IonTitle>User Profile</IonTitle>
                    </IonToolbar>
                    </IonHeader>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Your Profile</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonCardSubtitle>
                                Name
                            </IonCardSubtitle>
                            <div style={styles.tell}>
                                {userInfo.userName}
                            </div>
                            <IonCardSubtitle>
                                Height
                            </IonCardSubtitle>
                            <div style={styles.tell}>
                                {userInfo.height} in
                            </div>
                            <IonCardSubtitle>
                                Weight
                            </IonCardSubtitle>
                            <div style={styles.tell}>
                                {userInfo.weight}lbs
                            </div>
                            <IonCardSubtitle>
                                Target Weight
                            </IonCardSubtitle>
                            <div style={styles.tell}>
                                {userInfo.targetWeight}lbs
                            </div>
                            <IonCardSubtitle>
                                Year Born
                            </IonCardSubtitle>
                            <div style={styles.tell}>
                                {userInfo.yearBorn}
                            </div>
                            <IonCardSubtitle>
                                Gender
                            </IonCardSubtitle>
                            <div style={styles.tell}>
                                {userInfo.gender.charAt(0).toUpperCase()
                                 + userInfo.gender.slice(1)}
                            </div>
                            <IonCardSubtitle>
                                Days Records
                            </IonCardSubtitle>
                            <div style={styles.tell}>
                                {userData.length}
                            </div>
                        </IonCardContent>
                    </IonCard>
                    <IonButton
                    onClick={()=>this.setState({showEdit:true})}
                    style={styles.pad}
                    color={"success"}
                    expand="block" fill="outline">
                        Edit Target Weight
                    </IonButton>
                    <IonButton 
                    onClick={()=>this.setState({showDelWorkouts:true})}
                    style={styles.pad}
                    color={"warning"}
                    expand="block" fill="outline">
                        Delete Workout Records
                    </IonButton>
                    <IonButton
                    onClick={()=>this.setState({showDelProfile:true})}
                    style={styles.pad}
                    color={"danger"}
                    expand="block" fill="outline">
                        Delete Profile
                    </IonButton>
                    <div style={styles.bump} />
                    <IonAlert
                        isOpen={this.state.showDelProfile}
                        onDidDismiss={this.dismissAlerts}
                        header={'Confirm!'}
                        message={'Are you sure you want to delete your profile?'}
                        buttons={[
                            {
                            text: 'Cancel',
                            role: 'cancel'
                            },
                            {
                            text: 'Yes',
                            handler: () => {
                                this.deleteProfile();
                            }
                            }
                        ]}
                    />
                    <IonAlert
                        isOpen={this.state.showDelWorkouts}
                        onDidDismiss={this.dismissAlerts}
                        header={'Confirm!'}
                        message={'Are you sure you want to delete your workouts?'}
                        buttons={[
                            {
                            text: 'Cancel',
                            role: 'cancel'
                            },
                            {
                            text: 'Yes',
                            handler: () => {
                                this.deleteWorkouts();
                            }
                            }
                        ]}
                    />
                    <IonAlert
                        isOpen={this.state.showEdit}
                        onDidDismiss={this.dismissAlerts}
                        header={'Change Target Weight'}
                        message={'What is your new target weight?'}
                        inputs={[
                            {
                                name: 'weight',
                                type: 'number',
                                value:parseInt(userInfo.targetWeight),
                                min: 80,
                                max: 500
                            }
                        ]}
                        buttons={[
                            {
                            text: 'Cancel',
                            role: 'cancel'
                            },
                            {
                            text: 'Ok',
                            handler: (a:any) => {
                                this.saveWeight(a);
                            }
                            }
                        ]}
                    />
                </IonContent>
            </IonPage>
        )
    }
    dismissAlerts = () =>{
        this.setState({
            showEdit:false,
            showDelWorkouts:false,
            showDelProfile:false
        });
    }
    grabUser = () =>{
        let user = vault.getUser();
        if(!user){
            this.props.history.push("/");
        }else{
            this.setState({userInfo:user});
        }
    }
    grabUserData = async () =>{
        let userData = await vault.getDayData();
        this.setState({userData});
    }
    deleteProfile = () =>{
        vault.clearDayLogs();
        vault.reset();
        vault.initializeApp();
        vault.runVaultNotificationSystem();
        this.props.history.push("");
    }
    deleteWorkouts = () =>{
        vault.clearDayLogs();
        this.props.history.push("/home");
    }
    saveWeight = (a:any) =>{
        vault.updateUserTargetWeight(a.weight.toString());
        this.props.history.push("/home");
    }
}

const styles = {
    tell:{
        fontSize:16,
        color:'white',
        marginBottom:20
    },
    bump:{
        height:50
    },
    pad:{
        margin:10
    }
}

export default User;