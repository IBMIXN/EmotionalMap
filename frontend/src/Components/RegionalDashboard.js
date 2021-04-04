import React, { Component, createRef } from 'react'
import FadeIn from 'react-fade-in';
import TwitterLogoList from './TwitterLogoList';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../regionalDashboard.css';
import '../dashboard.css';

import fear_emoji from "../images/1F631.svg";
import confident_emoji from "../images/1F60E.svg";
import anger_emoji from "../images/1F624.svg";
import joy_emoji from "../images/1F604.svg";
import sadness_emoji from "../images/1F622.svg";


export default class RegionalDashboard extends Component {
    constructor(props){
        super(props);
        this.fear_inner = createRef();
        this.confident_inner = createRef();
        this.anger_inner = createRef();
        this.joy_inner = createRef();
        this.sadness_inner = createRef();
    }
    componentDidMount(){
        let {colourCode} = this.props;

        // Changes the colour of the progress bar by accessing the
        // child element
        const chng_inner_color = (ref, colour) => {
            if (ref.current) {
                const inner = ref.current.querySelector(".progress-bar");
                if ( inner ) {
                   inner.style.backgroundColor = colour;
                }
            }
        }

        chng_inner_color(this.fear_inner, colourCode.Fear);
        chng_inner_color(this.confident_inner, colourCode.Confident);
        chng_inner_color(this.anger_inner, colourCode.Anger);
        chng_inner_color(this.joy_inner, colourCode.Joy);
        chng_inner_color(this.sadness_inner, colourCode.Sadness);
    }

    render() {
        let {data} = this.props;
        // prevent crashing if data hasn't been loaded in
        if(!data){
            data = {
                name: 'Loading...',
                joy: 0,
                anger: 0,
                fear: 0,
                sadness: 0,
                confident: 0,
                analytical: 0,
                tentative: 0,
                trend1: 'Loading...',
                trend2: 'Loading...',
                trend3: 'Loading...',
                sample_size: 'Loading...'
              }
        }
        const check = () =>{
            const arr = [];
            arr[0] = data.fear;
            arr[1] = data.confident;
            arr[2] = data.anger;
            arr[3] = data.joy;
            arr[4] = data.sadness;

            const indexOfMaxValue = arr.indexOf(Math.max(...arr));
            var return_img = undefined;

            switch(indexOfMaxValue){
                case 0:
                    return_img = fear_emoji;
                    break;
                case 1:
                    return_img = confident_emoji;
                    break;
                case 2:
                    return_img = anger_emoji;
                    break;
                case 3:
                    return_img = joy_emoji;
                    break;
                default:
                    return_img = sadness_emoji;
            }
            return return_img;
        }

        return (
            <div className="float_right">
                <div className="regional_container">
                    <div>
                        <div className="region-title">
                            {data.name}
                        </div>
                        <div className="emoji-div">
                            <img alt="regional dashboard emoji" src={check()} width="56px" height="56px"/>
                        </div>
                        <div className="line"></div>

                        <div className="regional-top-hashtags">
                            <div className="section_title">
                                Top Trends
                            </div>
                            <FadeIn>
                            <TwitterLogoList message={data.trend1} long={true}/>
                            <TwitterLogoList message={data.trend2} long={true}/>
                            <TwitterLogoList message={data.trend3} long={true}/>
                            </FadeIn>
                        </div>

                        <div className="emotional-breakdown">
                            <div className="section_title">
                                Emotional Breakdown
                            </div>
                            <div className="progress_bar_container">
                                <ProgressBar ref={this.fear_inner} animated now={data.fear} label={Math.round(data.fear)+"%"} className="styled-progress-bar" height="1px" style={{ height: "30.82px", margin:"10px 0px 10px 0px", "borderRadius": "19.5px"}}/>
                                <ProgressBar ref={this.confident_inner} animated now={data.confident} label={Math.round(data.confident)+"%"} className="styled-progress-bar" height="1px" style={{ height: "30.82px", margin:"10px 0px 10px 0px", "borderRadius": "19.5px"}}/>
                                <ProgressBar ref={this.anger_inner} animated now={data.anger} label={Math.round(data.anger)+"%"} className="styled-progress-bar" height="1px" style={{ height: "30.82px", margin:"10px 0px 10px 0px", "borderRadius": "19.5px" }}/>
                                <ProgressBar ref={this.joy_inner} animated now={data.joy} label={Math.round(data.joy)+"%"} className="styled-progress-bar" height="1px" style={{ height: "30.82px", margin:"10px 0px 10px 0px" , "borderRadius": "19.5px"}}/>
                                <ProgressBar ref={this.sadness_inner} animated now={data.sadness} label={Math.round(data.sadness)+"%"} className="styled-progress-bar" height="1px" style={{ height: "30.82px", margin:"10px 0px 10px 0px", "borderRadius": "19.5px" }}/>
                            </div>
                        </div>
                        <div className="sample-size">
                            Sample size: {data.sample_size}
                        </div>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}
