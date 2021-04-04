import React from "react";
import Chart from "react-apexcharts";

import fear_emoji from "../images/1F631.svg";
import confident_emoji from "../images/1F60E.svg";
import anger_emoji from "../images/1F624.svg";
import joy_emoji from "../images/1F604.svg";
import sadness_emoji from "../images/1F622.svg";


export default class RadialChart extends React.Component {
    constructor(props) {
      super(props);
      
      const {colourCode} = this.props

      this.state = {
        series: this.props.values,
        options: {
          chart: {
            height: 10,
            type: 'radialBar',
          },
          colors: [colourCode.Fear, colourCode.Confident, colourCode.Anger, colourCode.Joy, colourCode.Sadness],
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },

            //   hole
              hollow: {
                margin: 5,
                size: '35%',
                background: 'transparent',
                image: this.check(),
                imageWidth: 80,
                imageHeight: 80,
                imageOffsetX: 0,
                imageOffsetY: 0,
                imageClipped: false,
                position: 'front',
                dropShadow: {
                  enabled: false,
                  top: 0,
                  left: 0,
                  blur: 3,
                  opacity: 0.5
                }
            },
              
              track: {
                show: true,
                startAngle: undefined,
                endAngle: undefined,
                background: '#C4C4C4',
                strokeWidth: 160,
                opacity: 0.2,
                margin: 5, 
                dropShadow: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 3,
                    opacity: 0.5
                }
            },
            stroke: {
                lineCap: 'round'
              },
            }
          },
          labels: ['Fear', 'Confident', 'anger', 'Joy', 'Sadness'],
        },
      };

    }

    componentDidUpdate(prevProps, prevState){
      if (prevProps.values !== this.props.values) {
        this.setState({
          series: this.props.values,
          options: {
            ...prevState,
            plotOptions : {
              radialBar: {
                hollow: {
                  image: this.check()
                }
              }
            }
          }
        })
    }
    }

    check = () => {
        const arr = this.props.values;
        const indexOfMaxValue = arr.indexOf(Math.max(...arr));
        var return_img = undefined;
        // decide the return emoji using the index of the max percentage 
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
  
    

    render() {
      return (
        <div id="chart">
            <Chart colors={this.state.colors} options={this.state.options} series={this.state.series} type="radialBar" height={280} />
        </div>
      )
      }
    };