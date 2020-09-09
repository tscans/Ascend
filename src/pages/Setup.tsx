import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
IonCard,IonCardContent,IonCardHeader,IonCardTitle,IonItem,IonInput,
IonSelect,IonSelectOption,IonButton,IonCardSubtitle,IonAlert } from '@ionic/react';
import vault from '../vault/vault';
import {RouteComponentProps} from 'react-router';

interface MyProps extends RouteComponentProps<{}> {}

class Setup extends React.Component<MyProps>{
    state = {
        userInfo:{
            userName:"",
            yearBorn:"",
            gender:"",
            height:"",
            weight:"",
            targetWeight:""
        },
        showAlert:false,
        checkingUser:true
    }
    componentDidMount(){
        let user = vault.getUser();
        if(user){
            this.props.history.push("/home");
        }else{
            this.setState({checkingUser:false});
        }
    }
    submit = () =>{
        if(Object.values(this.state.userInfo).includes("")){
            this.openAlert();
            return;
        }
        vault.saveUser(this.state.userInfo);
        this.props.history.push("/home");
    }
    changeValue = (key:string,value:string) =>{
        let currState : any = {...this.state.userInfo};
        currState[key] = value;
        this.setState({userInfo:currState});
    }
    render(){
        let {userName,yearBorn,gender,height,weight,targetWeight} = this.state.userInfo;
        let minAge = (new Date()).getFullYear() - 16;
        return(
            <IonPage>
                <IonContent fullscreen>
                    <IonHeader>
                    <IonToolbar>
                        <IonTitle>Setup Ascend</IonTitle>
                    </IonToolbar>
                    </IonHeader>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Welcome to Ascend</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            We just have six questions to set you up.    
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Your Name</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem>
                                <IonInput value={userName} placeholder="Name" onIonChange={e => this.changeValue("userName",e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Year Born</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem>
                                <IonSelect value={yearBorn} placeholder="Select One" onIonChange={e => this.changeValue("yearBorn",e.detail.value)}>
                                {Array.from(Array(minAge-1900).keys()).map((i)=>{
                                    let base = 1900;
                                    let ci = base + i;
                                    return(
                                        <IonSelectOption key={i} value={(ci).toString()}>
                                            {ci}
                                        </IonSelectOption>
                                    )
                                }).reverse()}
                                </IonSelect>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Gender</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                        <IonItem>
                            <IonSelect value={gender} placeholder="Select One" onIonChange={e => this.changeValue("gender",e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Height</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem>
                                <IonSelect value={height} placeholder="Select One" onIonChange={e => this.changeValue("height",e.detail.value)}>
                                {Array.from(Array(28).keys()).map((i)=>{
                                    let base = 58;
                                    let ci = base + i;
                                    return(
                                        <IonSelectOption key={i} value={(ci).toString()}>
                                            {Math.floor(ci/12)} ft {ci%12} in
                                        </IonSelectOption>
                                    )
                                })}
                                </IonSelect>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Weight (lbs)</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem>
                                <IonInput 
                                type={"number"} inputMode={"numeric"}
                                value={weight} placeholder="Weight" onIonChange={e => this.changeValue("weight",e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Target Weight (lbs)</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem>
                                <IonInput 
                                type={"number"} inputMode={"numeric"}
                                value={targetWeight} placeholder="Target Weight" onIonChange={e => this.changeValue("targetWeight",e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                    <IonButton
                    style={{margin:20}}
                    color="primary" expand="block" onClick={this.submit}>Submit</IonButton>
                    <div style={{height:60}}/>
                    <IonAlert
                        isOpen={this.state.showAlert}
                        onDidDismiss={this.closeAlert}
                        header={'Error'}
                        message={'Please answer every question.'}
                        buttons={['OK']}
                    />
                </IonContent>
            </IonPage>
        )
    }
    openAlert = () =>{
        this.setState({showAlert:true});
    }
    closeAlert = () =>{
        this.setState({showAlert:false});
    }
}

export default Setup;