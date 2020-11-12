import React from 'react';
import * as d3 from 'd3';

const getLineData = (data, radius) => {
  return data.map(function(element) {
    return {
      x: radius + element.x,
      y: element.y
    };
 });
}

export default class Donut extends React.Component {
 constructor(props) {
   super(props)
   this.myRef = React.createRef();
 }
  componentDidMount(){
    const {
      width,
      height,
      number1,
      number2,
      numberColor1,
      numberColor2,
      title,
      totalText,
      titleColor,
      totalColor,
      donutWidth,
      strokeColor,
      values,
    } = this.props
    
    let dataset = [
      {
        label: 'Abulia',
        count: number1
      }, {
        label: 'Betelgeuse',
        count: number2
      },
    ];

    let radius = Math.min(width, height) / 2;

    let color = d3.scaleOrdinal([numberColor1, numberColor2])

    let svg = d3.select(this.myRef.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +
                    ',' + (height / 2) + ')');
    const innerRadius = radius - donutWidth
    let arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

    let pie = d3.pie()
        .value(function(d) {
            return d.count;
        })
        .sort(null);

    svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
            return color(d.data.label);
        });
    svg.append("text")
        .attr("dy", "-1em")
        .attr("font-size", "1.5em")
        .style("text-anchor", "middle")
        .attr("class", "inside")
        .attr('fill', titleColor)
        .text(function(d) {
            return title;
        });

    svg.append("text")
      .attr("dy", "0em")
      .attr("font-size", "1.5em")
      .style("text-anchor", "middle")
      .attr("class", "data")
      .attr('fill', totalColor)
      .text(function(d) {
          return totalText
      });

    let lineData = getLineData(values, innerRadius * -1)

    let lineFunction = d3.line()
                          .x(function(d) { return d.x; })
                          .y(function(d) { return d.y; })
    svg.append("path")
      .attr("dx","100px")
      .attr('dy','5em')
      .attr("d", lineFunction(lineData))
      .attr("stroke", strokeColor)
      .attr("stroke-width", 2)
      .attr("fill", "none");
  } 

  render(){
    return (
      <div ref={this.myRef} />
    )
  }
}
