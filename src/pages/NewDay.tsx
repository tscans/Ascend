import React from 'react';
import {IonPage,IonContent,IonHeader,IonToolbar,IonTitle,
IonCard,IonCardTitle,IonCardHeader,IonCardContent,IonToggle,
IonCardSubtitle,IonInput,IonItem,IonButtons,IonBackButton,IonButton} from '@ionic/react';

import vault from '../vault/vault';
import calculation from '../calculation/calculation';

class NewDay extends React.Component{
    state = {
        chosenToken:null,
        climbStairs:false,
        otherCals:false,
        recordWeight:false,
        numStairs:"",
        timeClimbing:"",
        extraCals:"",
        weight:"",
        user:null
    }
    componentDidMount(){
        let user = vault.getUser();
        this.setState({user});
    }
    chooseToken = (i:number) =>{
        this.setState({chosenToken:i});
    }
    checkItem = (key:string,value:any) =>{
        let currState : any = {...this.state};
        currState[key] = value;
        this.setState(currState);
    }
    submit = () =>{
        let {weight,extraCals,timeClimbing,numStairs,user} = this.state;
        
    }
    render(){
        let {climbStairs,otherCals,recordWeight,user,
            numStairs,timeClimbing,extraCals} = this.state;
        if(!user){
            return <div/>
        }
        return(
            <IonPage>
                <IonContent fullscreen>
                    <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/home" />
                        </IonButtons>
                        <IonTitle>Ascend</IonTitle>
                    </IonToolbar>
                    </IonHeader>
                    <div style={styles.topCards}>
                        <IonCard style={{width:"50%"}}>
                            <IonCardContent>
                                Today's Caloric Goal
                            </IonCardContent>
                            <IonCardHeader style={{textAlign:'center',paddingTop:0}}>
                                <IonCardTitle>1600 cals</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard  style={{width:"50%"}}>
                            <IonCardContent>
                                Today's Stair Step Goal
                            </IonCardContent>
                            <IonCardHeader style={{textAlign:'center',paddingTop:0}}>
                                <IonCardTitle>1000</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </div>
                    
                    <IonCard>
                        <IonCardContent>
                            How close were you to this goal?
                        </IonCardContent>
                        <IonCardContent style={styles.tokenContent}>
                            {this.renderTokens()}
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardContent style={{marginTop:20,...styles.tokenContent}}>
                            Did you climb stairs? <IonToggle
                            onIonChange={e => this.checkItem("climbStairs",e.detail.checked)}
                            checked={climbStairs} />
                        </IonCardContent>
                        {this.renderClimbStairs()}
                    </IonCard>
                    <IonCard>
                        <IonCardContent style={{marginTop:20,...styles.tokenContent}}>
                            Did you burn calories some other way? <IonToggle
                            onIonChange={e => this.checkItem("otherCals",e.detail.checked)}
                            checked={otherCals} />
                        </IonCardContent>
                        {this.renderOtherCals()}
                    </IonCard>
                    <IonCard>
                        <IonCardContent style={{marginTop:20,...styles.tokenContent}}>
                            Did you weigh yourself today? <IonToggle
                            onIonChange={e => this.checkItem("recordWeight",e.detail.checked)}
                            checked={recordWeight} />
                        </IonCardContent>
                        {this.renderWeight()}
                    </IonCard>
                    <IonCard>
                        <IonCardContent style={{marginTop:20,...styles.tokenContent}}>
                            Today's Caloric Breakdown
                        </IonCardContent>
                        <IonCardContent style={styles.breakdown}>
                            <span>
                                Sedintary Burn<br/>
                                <span style={styles.lfb}>
                                    {this.sedentaryBurn()}
                                </span>
                            </span>
                            +
                            <span>
                                Stair Climb<br/>
                                <span style={styles.lfb}>
                                {calculation.stairsCalorieEstimate({
                                    numStairs:parseFloat(numStairs),
                                    minutesClimbing:parseInt(timeClimbing),
                                    weight:this.getCurrentWeight()
                                })}
                                </span>
                            </span>
                            +
                            <span>
                                Other Cals<br/>
                                <span style={styles.lfb}>
                                    {extraCals || 0}
                                </span>
                            </span>
                            -
                            <span>
                                Eating<br/>
                                <span style={styles.lfb}>2600</span>
                            </span>
                            =
                            <span>
                                Burned<br/>
                                <span style={styles.lfb}>2600</span>
                            </span>
                        </IonCardContent>
                    </IonCard>
                    <IonButton
                    style={{margin:20}}
                    color="primary" expand="block" onClick={this.submit}>Submit</IonButton>
                    <div style={{height:60}}/>
                </IonContent>
            </IonPage>
        )
    }
    renderTokens = () =>{
        let {chosenToken} = this.state;
        return [1,2,3,4].map((i)=>{
            let tokenColor = `hsl(${(180 - ((i-1)*60))},100%,70%)`;
            return(
                <div key={i} onClick={()=>this.chooseToken(i)}>
                    <div style={{
                        borderRadius:i===chosenToken?0:50,
                        backgroundColor:tokenColor,
                        height:60,width:60,
                        border:`8px solid ${i===chosenToken?"white":tokenColor}`,
                        color:"black",
                        lineHeight:"44px",
                        textAlign:'center',
                        fontSize:24
                    }}
                    >
                        {i}
                    </div>
                    <div style={{
                        fontSize:10,
                        marginTop:5,
                        textAlign:'center'
                    }}>
                        Closer To<br/>1600
                    </div>
                </div>
            )
        });
    }
    renderClimbStairs = () =>{
        let {numStairs,timeClimbing} = this.state;
        if(this.state.climbStairs){
            return(
                <>
                    <IonCardHeader>
                        <IonCardSubtitle>Number of Stairs</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonInput inputmode={"numeric"}
                                value={numStairs} placeholder="# of Stairs"
                             onIonChange={e => this.checkItem("numStairs",e.detail.value)}></IonInput>
                        </IonItem>
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardSubtitle>Minutes Climbing</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonInput
                            inputmode={"numeric"}
                            value={timeClimbing} placeholder="Minutes Climbing"
                            onIonChange={e => this.checkItem("timeClimbing",e.detail.value)}></IonInput>
                        </IonItem>
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardSubtitle>Estimations</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent style={styles.topCards}>
                        <div>
                            Calories Burned:<br/>
                            <span style={styles.estText}>
                            {calculation.stairsCalorieEstimate({
                                numStairs:parseFloat(numStairs),
                                minutesClimbing:parseInt(timeClimbing),
                                weight:this.getCurrentWeight()
                            })}
                            </span>
                        </div>
                        <div>
                            Steps / Minute:<br/> 
                            <span style={styles.estText}>
                            {calculation.spmEst(parseFloat(numStairs),parseInt(timeClimbing))}
                            </span>
                        </div>
                    </IonCardContent>
                </>
            )
        }
    }
    renderOtherCals = () =>{
        let {extraCals} = this.state;
        if(this.state.otherCals){
            return(
                <>
                    <IonCardHeader>
                        <IonCardSubtitle>Time Climbing</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonInput
                            inputMode={"numeric"}
                            type={"number"}
                            value={extraCals} placeholder="Extra Calories"
                             onIonChange={e => this.checkItem("extraCals",e.detail.value)}></IonInput>
                        </IonItem>
                    </IonCardContent>
                </>
            )
        }
    }
    renderWeight = () =>{
        let {weight} = this.state;
        if(this.state.recordWeight){
            return(
                <>
                    <IonCardHeader>
                        <IonCardSubtitle>Weight (lbs)</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonInput inputMode={"numeric"} type={"number"}
                            value={weight} placeholder="Weight"
                            onIonChange={e => this.checkItem("weight",e.detail.value)}></IonInput>
                        </IonItem>
                    </IonCardContent>
                </>
            )
        }
    }
    getCurrentWeight = () =>{
        let {weight,user} = this.state;
        if(weight){
            return parseFloat(weight);
        }
        let u : any = user;
        return parseFloat(u.weight);
    }
    sedentaryBurn = () =>{
        let u : any = this.state.user;
        return calculation.basalMetabolicRateFormula({
            gender:u.gender,
            weight:parseFloat(u.weight),
            height:parseInt(u.height),
            age:calculation.getCurrentAge(u.yearBorn)
        });
    }
}

const styles = {
    token:{

    },
    tokenContent:{display:'flex',flexDirection:'row',justifyContent:'space-between',
    paddingTop:0},
    topCards:{
        display:'flex',
        justifyContent:'space-between'
    },
    breakdown:{
        fontSize:9,
        color:'white',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    lfb:{
        fontSize:16
    },
    estText:{
        fontSize:24,color:"white"
    }
}

export default NewDay;