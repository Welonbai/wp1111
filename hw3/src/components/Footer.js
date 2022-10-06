import React from 'react';
import '../styles.css';

class Footer extends React.Component {
    render(){
        const length = this.props.entries.length
        
        if(length>0){
            return(
                <footer id="todo-footer" className='todo-app__footer'>
                    <div className="todo-app__total">
                        {length} left
                    </div>
                    <ul className="todo-app__view-buttons">
                        <button>All</button>
                        <button>Active</button>
                        <button>completed</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button>Clear completed</button>
                    </div>
                </footer>
            )
        }else{

        }
    }
}

export default Footer