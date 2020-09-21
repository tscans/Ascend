import React from 'react';
import {IonCard, IonCardContent, IonCardSubtitle, IonCardTitle} from '@ionic/react';

interface MyProps{
    data:any;
}

class TotalCard extends React.Component<MyProps>{
    render(){
        let allTimes : allTimes = this.generateAllTimes();
        return(
            <IonCard>
                <IonCardContent>
                    <IonCardTitle>
                        All Time
                    </IonCardTitle>
                    <IonCardContent style={styles.flatEven}>
                        <div>
                            <IonCardSubtitle>Stairs Climbed</IonCardSubtitle>
        <IonCardTitle>{this.nFormatter(allTimes.stairsClimbed,0)}</IonCardTitle>
                        </div>
                        <div>
                            <IonCardSubtitle>Minutes Climbing</IonCardSubtitle>
                            <IonCardTitle>
                            {this.nFormatter(allTimes.minutesClimbing,0)}
                            </IonCardTitle>
                        </div>
                    </IonCardContent>
                    <IonCardContent style={styles.flatEven}>
                        <div>
                            <IonCardSubtitle>Calories Burned<br/>Climbing</IonCardSubtitle>
        <IonCardTitle>{this.nFormatter(allTimes.calsBurned,0)}</IonCardTitle>
                        </div>
                        <div>
                            <IonCardSubtitle>Total Days<br/>Logged</IonCardSubtitle>
                            <IonCardTitle>
                            {this.nFormatter(allTimes.totalLogs,0)}    
                            </IonCardTitle>
                        </div>
                    </IonCardContent>
                </IonCardContent>
            </IonCard>
        )
    }
    nFormatter(num:number, digits:number) {
        var si = [
          { value: 1, symbol: "" },
          { value: 1E3, symbol: "k" },
          { value: 1E6, symbol: "M" },
          { value: 1E9, symbol: "G" },
          { value: 1E12, symbol: "T" },
          { value: 1E15, symbol: "P" },
          { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
          if (num >= si[i].value) {
            break;
          }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
      }
    generateAllTimes = () =>{
        let {data} = this.props;
        let allTimes : allTimes= {
            stairsClimbed:0,
            minutesClimbing:0,
            calsBurned:0,
            totalLogs:0
        };
        data.forEach((d:any)=>{
            allTimes.calsBurned += d.calsBurnedStairs;
            allTimes.minutesClimbing += d.minutesSpentClimbing;
            allTimes.stairsClimbed += d.stairsClimbed;
            allTimes.totalLogs += 1;
        });
        return allTimes;
    }
}

interface allTimes {
    stairsClimbed:number;
    minutesClimbing:number;
    calsBurned:number;
    totalLogs:number;
}

const styles = {
    flatEven:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    lbs:{
        fontSize:12
    }
}

export default TotalCard;