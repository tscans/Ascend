import React from 'react';
import {IonPage,IonContent,IonHeader,IonToolbar,IonTitle,
IonCard,IonCardTitle,IonCardHeader,IonCardContent,IonToggle,
IonCardSubtitle,IonInput,IonItem,IonButtons,IonBackButton,IonButton,
IonAlert} from '@ionic/react';

import vault from '../vault/vault';
import calculation from '../calculation/calculation';
import {RouteComponentProps} from 'react-router';

interface MyProps extends RouteComponentProps<{}> {}

class NewDay extends React.Component<MyProps>{
    state = {
        chosenToken:null,
        climbStairs:false,
        otherCals:false,
        recordWeight:false,
        numStairs:"",
        timeClimbing:"",
        extraCals:"",
        weight:"",
        user:null,
        alertOpen:false
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
        let {timeClimbing,numStairs,chosenToken} = this.state;
        if(!chosenToken){
            this.setState({alertOpen:true});
            return;
        }
        let stairsBurn = calculation.stairsCalorieEstimate({
            numStairs:parseFloat(numStairs),
            minutesClimbing:parseInt(timeClimbing),
            weight:this.getCurrentWeight()
        });
        vault.addNewDay({
            dateTime:new Date(),
            stairsClimed:parseInt(numStairs) || 0,
            minutesSpentClimbing:parseInt(timeClimbing) || 0,
            calIntakeTarget:chosenToken || 1,
            calsBurnedStairs:stairsBurn,
            weight:this.getCurrentWeight(),
            dayOfTheWeek:(new Date()).getDay()
        });
        this.props.history.push("/home");
    }
    getTargetCalories = () =>{
        let {user} = this.state;
        let u : any = user;
        console.log(u)
        return calculation.targetCalories({
            gender:u.gender,
            weight:parseFloat(u.weight),
            height:parseInt(u.height),
            age:calculation.getCurrentAge(u.yearBorn)
        });
    }
    render(){
        let {climbStairs,otherCals,recordWeight,user,
            numStairs,timeClimbing,extraCals:exc,alertOpen} = this.state;
        if(!user){
            return <div/>
        }
        let targetCalories = this.getTargetCalories();
        let sedentary = this.sedentaryBurn();
        let stairsBurn = calculation.stairsCalorieEstimate({
            numStairs:parseFloat(numStairs),
            minutesClimbing:parseInt(timeClimbing),
            weight:this.getCurrentWeight()
        });
        let eating = this.userChoiceCals();
        let extraCals = parseInt(exc) || 0;
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
                                <IonCardTitle>{targetCalories.one} cals</IonCardTitle>
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
                                    {sedentary}
                                </span>
                            </span>
                            +
                            <span>
                                Stair Climb<br/>
                                <span style={styles.lfb}>
                                {stairsBurn}
                                </span>
                            </span>
                            +
                            <span>
                                Other Cals<br/>
                                <span style={styles.lfb}>
                                    {extraCals}
                                </span>
                            </span>
                            -
                            <span>
                                Eating<br/>
                                <span style={styles.lfb}>
                                    {eating}
                                </span>
                            </span>
                            =
                            <span>
                                Burned<br/>
                            <span style={styles.lfb}>
                                {this.burnedCalsCalc(sedentary,stairsBurn,extraCals,eating)}
                            </span>
                            </span>
                        </IonCardContent>
                    </IonCard>
                    <IonButton
                    style={{margin:20}}
                    color="primary" expand="block" onClick={this.submit}>Submit</IonButton>
                    <div style={{height:60}}/>
                    <IonAlert
                        isOpen={alertOpen}
                        onDidDismiss={() => this.setState({alert:false})}
                        header={'Warning'}
                        message={'Please select caloric intake'}
                        buttons={['OK']}
                    />
                </IonContent>
            </IonPage>
        )
    }
    renderTokens = () =>{
        let targetCalories :any = this.getTargetCalories();
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
                        {mapper[`${i}-m`]}<br/>{targetCalories[mapper[i]]}
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
    userChoiceCals = () =>{
        let chosenToken :any = this.state.chosenToken;
        if(!chosenToken){
            return 0;
        }
        let targetCalories :any = this.getTargetCalories();
        return targetCalories[mapper[chosenToken]];
    }
    burnedCalsCalc = (sedentary:number,stairsBurn:number,extraCals:number,eating:number) =>{
        
        return sedentary + stairsBurn + extraCals - eating;
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

const mapper :any= {
    "1":"one",
    '2':"two",
    '3':"three",
    '4':"four",
    '1-m':"At or Lower",
    '2-m':"Closer to",
    '3-m':"Closer to",
    '4-m':"At or above"
};

export default NewDay;