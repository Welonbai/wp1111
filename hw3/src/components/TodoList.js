import React from 'react';
import '../styles.css';
import TodoItems from './TodoItems';
import Footer from './Footer';

class TodoList extends React.Component {
    constructor(props){
		super(props);
		this.state = {items: []};
	}

    handleKeyPress = (event) => {
        if(event.key==="Enter"){
            this.setState({
                items: this.state.items.concat(event.target.value)
            }, function () {
                this.inputTitle.value = ""
            });

        }
        
    }

    render(){
        
        return(
            <div className="App">
                <div id="root" className='todo-app__root'>
                    <header className='todo-app__header'>
                        <h1 className='todo-app__title'>todos</h1>
                    </header>
                    <section className='todo-app__main'>
                        <input className='todo-app__input' 
                        ref={el => this.inputTitle = el}
                        onKeyPress={this.handleKeyPress}
                        placeholder='What needs to be done?'></input>

                        <TodoItems entries={this.state.items}/>
                    </section>
                    {/* <footer id="todo-footer" className='todo-app__footer'>

                    </footer> */}
                    <Footer entries={this.state.items}/>
                </div>
            </div>
        );
    }
    
}

export default TodoList;