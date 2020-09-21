import React from 'react';
import {IonModal,IonButton, IonCard, IonCardContent, IonCardTitle} from '@ionic/react'; 
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { Handle, Track, Tick } from './FilterComps';
import moment from 'moment';

interface MyProps{
    showFilterModal:boolean;
    closeFilter:any;
    data:any;
    filterLogs:any;
}

class FilterModal extends React.Component<MyProps>{
    state = {
        values: [1, 15]
    }

    closeFilter = () =>{
        this.props.closeFilter();
    }
    saveFilter = () =>{
        this.props.filterLogs(this.state.values);
        this.closeFilter();
    }
    
    onChange = (values: any) => {
        if(values.length < 2){
            return;
        }
        let left = values[0];
        let right = values[0];
        if(!(left <= right)){
            return;
        }
        this.setState({ values });
    }

    render(){
        let {values} = this.state;
        let domain = this.genDomain();
        let {data} = this.props;
        if(data.length < 15){
            return <></>
        }
        return(
            <IonModal isOpen={this.props.showFilterModal} >
                <div style={styles.vertCent}>
                    <IonCard>
                        <IonCardContent>
                            <IonCardTitle>
                                Filter Workout Logs
                            </IonCardTitle>
                        <div style={{marginBottom:100}}>
                        <Slider
                            mode={1}
                            step={1}
                            domain={domain}
                            rootStyle={sliderStyle}
                            onChange={this.onChange}
                            values={values}
                            >
                            <Rail>
                                {({ getRailProps }) => (
                                <div style={railStyle} {...getRailProps()} />
                                )}
                            </Rail>
                            <Handles>
                                {({ handles, getHandleProps }) => (
                                <div className="slider-handles">
                                    {handles.map(handle => (
                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        domain={domain}
                                        getHandleProps={getHandleProps}
                                    />
                                    ))}
                                </div>
                                )}
                            </Handles>
                            <Tracks left={false} right={false}>
                                {({ tracks, getTrackProps }) => (
                                <div className="slider-tracks">
                                    {tracks.map(({ id, source, target }) => (
                                    <Track
                                        key={id}
                                        source={source}
                                        target={target}
                                        getTrackProps={getTrackProps}
                                    />
                                    ))}
                                </div>
                                )}
                            </Tracks>
                            <Ticks count={8}>
                                {({ ticks }) => (
                                <div className="slider-ticks">
                                    {ticks.map(tick => (
                                    <Tick key={tick.id} data={data} tick={tick} count={ticks.length} />
                                    ))}
                                </div>
                                )}
                            </Ticks>
                            </Slider>
                        </div>
                        <div style={{textAlign:'center'}}>
                        {moment(data[data.length - values[0]].dateTime).format("MMM Do")}
                        -
                        {moment(data[data.length - values[1]].dateTime).format("MMM Do")}  
                        </div>
                        
                        </IonCardContent>
                    </IonCard>
                    <div style={{padding:20}}>
                        <IonButton onClick={this.closeFilter}
                        expand={'block'}
                        color={"light"}
                        >
                            Cancel
                        </IonButton>
                        <IonButton onClick={this.saveFilter}
                        expand={'block'}
                        >
                            Filter
                        </IonButton>
                    </div>
                </div>
            </IonModal>
        )
    }
    genDomain = () =>{
        let {data} = this.props;
        return [1,data.length];
    }
}

const sliderStyle: React.CSSProperties = {
    marginTop: '10%',
    position: 'relative',
    width: '100%'
};
  
const railStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: 14,
    borderRadius: 7,
    cursor: 'pointer',
    backgroundColor: 'rgb(155,155,155)'
};

const styles = {
    vertCent:{
        paddingTop:"30%"
    }
}

export default FilterModal;