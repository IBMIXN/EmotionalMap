import React from 'react';
import FadeIn from 'react-fade-in';
import '../dashboard.css';
import RadialChart from './RadialChart';
import NumberedList from './NumberedList';
import TwitterLogoList from '../Components/TwitterLogoList';

export default function Dashboard(props) {
    const data = props.data;
    // function that clips the percentage values between 0 and 100
    const clamp = (num) => Math.min(Math.max(num, 0), 100);

    // round each percentage to nearest integer
    const valuesList = [Math.round(data.fear), Math.round(data.confident),Math.round(data.anger),Math.round(data.joy),Math.round(data.sadness)]
    valuesList.forEach((e, index) => valuesList[index] = clamp(e));
    const emotionsList = Object.keys(props.colourCode)
    
    // [["fear", 12],["confident", 5],...]
    const zipped = emotionsList.map(function(e, i) {
      return [e, valuesList[i]];
    });

    // Sort the zipped array using the percentages (descending order)
    zipped.sort(function(a, b) {
      return b[1] - a[1];
    });

    // return the emotions ordered from highest to lowest percentage
    const orderedEmotions = () => {
      var toReturn = []
      for(let i = 0; i < 5; i++){
        toReturn.push(<NumberedList key={"topHashtagsList"+i} number={(i+1) +"."} message={zipped[i][0].slice(0,1).toUpperCase() + zipped[i][0].slice(1) + " - " + zipped[i][1] + "%"}/>)
      }
      return toReturn;
    } 
    
    
    return (
        <div className="outer_container">
          <div className="big_container">
            <div className="grid">
              
              <div className="UK_statistics_title">
                UK Statistics
              </div>
              <div className="line1"></div>

              <div className="happiest_cities">
                <div className="section_title">Happiest Cities:</div>
                <FadeIn delay={200}>
                {/* {happiestCitiesList} */}
                  <NumberedList key={"happiestCitiesList"+1} number={"1."} message={data.happiest1}/>
                  <NumberedList key={"happiestCitiesList"+2} number={"2."} message={data.happiest2}/>
                  <NumberedList key={"happiestCitiesList"+3} number={"3."} message={data.happiest3}/>
                  <NumberedList key={"happiestCitiesList"+4} number={"4."} message={data.happiest4}/>
                  <NumberedList key={"happiestCitiesList"+5} number={"5."} message={data.happiest5}/>
                </FadeIn>
              </div>
              
              <div className="top_hashtags">
                <div className="section_title">Top Trends:</div>
                <FadeIn delay={200}>
                {/* {topHashtagsList} */}
                  <TwitterLogoList key={"topHashtagsList"+1} message={data.trend1}/>
                  <TwitterLogoList key={"topHashtagsList"+2} message={data.trend2}/>
                  <TwitterLogoList key={"topHashtagsList"+3} message={data.trend3}/>
                  <TwitterLogoList key={"topHashtagsList"+4} message={data.trend4}/>
                  <TwitterLogoList key={"topHashtagsList"+5} message={data.trend5}/>
                </FadeIn>
              </div>
              
              <div className="top_emotions">
                <div className="section_title">Top Emotions:</div>
                <FadeIn delay={200}>
                  {orderedEmotions()}
                </FadeIn>
              </div>
              
              <div className="dial_diagram">
                  <RadialChart values={valuesList} colourCode={props.colourCode}/>
              </div>
            </div>

          </div>
        </div>
    )
}
