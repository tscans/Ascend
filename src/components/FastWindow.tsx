import React from 'react';
import {IonCard, IonCardContent, IonCardSubtitle, IonCardTitle} from '@ionic/react';
import "./FastWindow.css";
import moment from 'moment';

class FastWindow extends React.Component{
    state = {
        time:new Date()
    }
    timeConst : any = null;
    componentDidMount(){
        let self = this;
        this.timeConst = setInterval(()=>{
            self.setState({time:new Date()});
        },1000*60);
    }
    componentWillUnmount(){
        if(this.timeConst){
            clearInterval(this.timeConst);
        }
    }
    render(){
        let time : Date = this.state.time;
        let isEatTime = this.isEatTime(time);
        let ballColor = this.generateBallColor(isEatTime);
        let ballPos : any = this.generateBallPos(time);
        return(
            <IonCard style={{textAlign:'center'}}>
                <IonCardContent>
                Recommended fasting 18 : 6 ratio
                <div className="pieContainer">
                    <div className="pie-time-slot"
                    style={{left:110,top:-15}}
                    >12AM</div>
                    <div className="pie-time-slot"
                    style={{left:-25,top:120}}
                    >6PM</div>
                    <div className="pie-time-slot"
                    style={{left:255,top:118}}
                    >6AM</div>
                    <div className="pie-time-slot"
                    style={{left:110,top:250}}
                    >12PM</div>
                    <div className="pieBackground"></div>
                    <div id="pieSlice1" className="hold"><div className="pie"></div></div>
                    <div id="pieSlice2" className="hold"><div className="pie"></div></div>
                    <div id="pieSlice3" className="hold"><div className="pie"></div></div>
                    <div id="pieSlice4" className="hold"><div className="pie"></div></div>
                    <div className="innerCircle">
                        <div className="content">
                            {
                                isEatTime ? 
                                (
                                    <IonCardSubtitle>
                                        Fast: {moment("20:00","hh:mm").fromNow()}
                                    </IonCardSubtitle>
                                )
                                :
                                (
                                    <IonCardSubtitle>
                                        Eat: {moment("14:00","hh:mm").fromNow()}
                                    </IonCardSubtitle>
                                )
                            }
                            <IonCardTitle>
                            Time to {isEatTime ? "Eat" : "Fast"}
                            </IonCardTitle>
                        </div>
                    </div>
                    <div className={"time-ball"}
                    style={{
                        top:ballPos.top,
                        left:ballPos.left,
                        borderColor:ballColor
                    }}
                    >

                    </div>
                </div>
                Eat between 2pm and 8pm
                </IonCardContent>
            </IonCard>
        )
    }
    generateBallPos = (specTime:Date) =>{
        let hours = specTime.getHours(); 
        let mins = specTime.getMinutes();
        let hrPerc = hours/24;
        let minPerc = mins / (24 * 60);
        let perc = hrPerc + minPerc;
        let degs = (perc * 360) - 90;
        let ballHalf = 35 / 2;
        let rtp : any = this.resolveToPoint(degs,225);
        return {
            top:rtp.mY+125 - ballHalf,
            left:rtp.mX+125 - ballHalf
        }
    }
    resolveToPoint = (deg:number, diameter:number) => {
        var rad = Math.PI * deg / 180;
        var r = diameter / 2;
        return {mX: r * Math.cos(rad), mY: r * Math.sin(rad)};
    }
    isEatTime = (specTime:Date) =>{
        var format = 'hh:mm:ss'
        var time = moment(specTime,format),
        beforeTime = moment('14:00:00', format),
        afterTime = moment('20:00:00', format);
        if (time.isBetween(beforeTime, afterTime)) {
            return true
        } else {
            return false
        }
    }
    generateBallColor = (isEatTime:boolean) =>{
        if (isEatTime) {
            return "rgb(2, 241, 2)";
        } else {
            return "#428CFF";
        }
    }
}

export default FastWindow;