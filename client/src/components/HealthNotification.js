
import React, {Component} from 'react';

export default class HealthNotification extends Component {
    constructor(){
        super();
        this.state = {
            chartData:[]
        };
    }
    componentWillMount(){
       Promise.all([
            fetch('http://localhost:5000/fitdata'),
            fetch('http://localhost:5000/healthgoal')
        ]).then ( files => {
           return Promise.all(files.map(res => res.json()));
        }).then(([stepd, goal]) => {
        const walk = stepd[0].Step;
        const sleep = stepd[1].Sleep;
        const cal = stepd[2].Calories;
        const walkgoal = goal.Walk_g;
        const sleepgoal = goal.Sleep_g;
        const calgoal = goal.Calories_g;
            this.setState({
                chartData: [
                    walk,
                    sleep,
                    cal,
                    walkgoal,
                    sleepgoal,
                    calgoal  
                ] 
            });
        });
    }
    render(){
        let steps;
        let sleep;
        let calories;
        if(this.state.chartData[0] >=  this.state.chartData[3]){
            steps= <div>Congratulation! You reach Your Steps Goal</div>
        }else if(this.state.chartData[0] <  this.state.chartData[3]){
            steps= <div>Complete your Steps Goal</div>
        }else{
            steps= <div> </div>
        }
        if(this.state.chartData[1] >=  this.state.chartData[4]){
            sleep = <div>Congratulation! You reach Your Sleep Goal</div>
        }else if(this.state.chartData[1] <  this.state.chartData[4]){
            sleep = <div>Your sleep goal incomplete</div>
        }else{
            sleep = <div> </div>
        }
        if(this.state.chartData[2] >=  this.state.chartData[5]){
            calories = <div>Congratulation! You reach Your Calories Goal</div>
        }else if (this.state.chartData[2] <  this.state.chartData[5]){
            calories = <div>Complete your Calories Goal</div>
        }else{
            calories = <div> </div>
        }  
        return (
            <>
                <div className="card-header">
                   {steps}
                </div>
                <div className="card-header">
                    {sleep}
                </div>
                <div className="card-header">
                    {calories}
                </div> 
            </>
        )
    }
}

