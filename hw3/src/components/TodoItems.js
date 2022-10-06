import React from 'react';
import '../styles.css';
import x from '../x.png';

class TodoItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {isActive:true};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({
            isActive: !this.state.isActive
        })
        const id = event.target.id
        console.log(this.state.isActive)
        if(this.state.isActive){
            document.getElementById(id+"todoItem").style.textDecoration = 'line-through';
            document.getElementById(id+"todoItem").style.opacity = 0.5;
        }else{
            document.getElementById(id+"todoItem").style.textDecoration = '';
            document.getElementById(id+"todoItem").style.opacity = 1;
        }
    }; 

    render(){
        const data = this.props.entries.map(
            (items, index)=>{
                return(
                    <li className='todo-app__item' key={index}>
                    <div className="todo-app__checkbox">
                        <input type="checkbox" 
                        onChange={this.handleChange} 
                        id={index}>
                        </input>
                        <label htmlFor={index}></label>
                    </div>
                    <h1 className='todo-app__item-detail' 
                        // style={{
                        //     opacity: this.state.isActive ? 0.5 : '',
                        //     textDecoration: this.state.isActive ? 'line-through' : ''
                        // }}
                        id={index+"todoItem"}
                    >
                    {items}
                    </h1>
                    <img src={x} className='todo-app__item-x'></img>
                    </li>
                )
            }
        )


        return(
            <ul className='todo-app__list' id="todo-list">
                {/* <li className='todo-app__item'>
                <div className="todo-app__checkbox">
                    <input type="checkbox" id="0"></input>
                    <label htmlFor="0"></label>
                </div>
                <h1 className='todo-app__item-detail'>{this.props.entries[0]}</h1>
                <img src={x} className='todo-app__item-x'></img>
                </li> */}
                {data}
            </ul>
        )
    }
}

export default TodoItems;