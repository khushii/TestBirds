import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import './DropdownBox.css'

const USERS = require('../../data/users');


class DropdownBox extends React.Component {
    constructor(props) {
    	super(props);
    	this.handleSelect = this.handleSelect.bind(this);
    	this.setStateDropdown = this.setStateDropdown.bind(this);
    	this.deleteItem = this.deleteItem.bind(this);
    	this.getStyle = this.getStyle.bind(this);
    	this._setSize = this._setSize.bind(this);
    	this.toggle = this.toggle.bind(this);
    	this.state = {
    			selectedParticipant: '',
    			items: [ ],
    			containerSize:'',
    			isOpen: false,
    			currentAction:''
    	 }
    }
    
    componentDidMount () {
        const container = this.container; // <div></div> :)
        this._setSize();
       }
    
 
     
   toggle() {
      this.setState({ isOpen: !this.state.isOpen });
      //this.getStyle();
      }
    
    _setSize () {
        const container = this.container; // undefined :(
        const containerSize = container.clientHeight;
      	console.log("size "+ JSON.stringify({ containerSize }));  
      	this.setState({containerSize:containerSize});
      }
    
    
    handleSelect(selectedOption) {
    	
    	console.log("Inside handle Selected Option");
        const { dispatch,containerSize } = this.props;
        let participantSearchFilter = ''
        this.setState({ selectedParticipant: selectedOption })
   
        console.log("Selected Option"+ JSON.stringify(selectedOption));
        if (selectedOption !== null) {
        	
        	var newItem = {
        		      label: selectedOption.label,
        		      value: selectedOption.value,
        		      picture:selectedOption.picture,
        		      role:selectedOption.role
        		    };
        	console.log("newItem"+ JSON.stringify(newItem));

        	this.setState({ items: this.state.items.concat(newItem) }, () => console.log(this.state.items));
        	 
        	selectedOption = "";
        	this.setState({selectedParticipant: ''});
        	this.setState({currentAction: 'Adding'});
        	this._setSize();
        }
        
        
    }
    
    
    deleteItem(value) {
    	console.log("Inside delete Items");
    	  var filteredItems = this.state.items.filter(function (item) {
    	    return (item.value !== value);
    	  });
    	  console.log("filteredItems"+ JSON.stringify(filteredItems));
    	  this.setState({
    	    items: filteredItems
    	  });
    	  this.setState({currentAction: 'Deleting'});
    	  this._setSize();
    	}

    setStateDropdown() {
        const { dispatch, dropdownIsOpen } = this.props;
        dispatch(searchBarActions.setStateDropdown(dropdownIsOpen))
    }
    
    
    optionRenderer(option) {
    	
        return (
        	<div>
        	<span className="optionImage"><img src={option.picture}></img></span> {option.label} 
            </div>
        )
    }
    
    getStyle() {
       	const { containerSize, isOpen, currentAction, items } = this.state;
       	console.log("Size in getStyle" + containerSize);
       	if(containerSize<225)
       	{
       	console.log("Inside height auto");
        return{
        	height:'auto',
            borderTop:'5px solid #3c763d'
        }
       	}
       	else if(currentAction==='Adding' && containerSize>=225 && isOpen === false && items.length>5 )
       	{
       	console.log("Inside no side increase");
        return{
        	height:'225px',
        	overflow: 'hidden',
        	borderTop:'5px solid #3c763d'	
        }
       	}
       	else if(currentAction==='Deleting')
       	{
       	console.log("Inside Height auto");
        return{
        	height:'auto',
        	borderTop:'5px solid #3c763d'
        }
       	}
       	else if(isOpen === true)
       	{
       	console.log("Inside Height auto");
        return{
        height:'auto' ,
        borderTop:'5px solid #3c763d'
        }
       	}
       
    }
    
   
    
   
  
    render() {
    	
    	const { containerSize, items } = this.state;
    	
    	  return (
    	            	<div id="s1" ref={node => this.container = node} className="mainClass">
    	            	<div style = {this.getStyle()}>
    	            	 <div className = "row rowMainHeader">
    			  		<div className = "col-xs-8 header"><h4>YOUR TEAM FOR THIS TEST</h4></div>
    			  		<div className = "col-xs-4 teamPage"><p className="teamPara">TEAM PAGE <img className="teamImg" src="http://localhost:3000/src/main/resources/META-INF/resources/js/data/team.png"></img></p></div>
    			  		</div>
    	                <div className="row rowDropdown">
    	                <div className="col-xs-6 dropdownbox">
                        <Select value={this.state.selectedParticipant} onChange={this.handleSelect}
                            ref={(ref) => { this.select = ref; }}
                            clearable={true}
                        	arrowRenderer={()=>{}}
                        	optionRenderer={this.optionRenderer}
                        	//optionComponent={GravatarOption}
                            closeOnSelect={true}
                            placeholder={<div><div className="someDiv"><img className="placeholderImg" src="http://localhost:3000/src/main/resources/META-INF/resources/js/data/plusSign.png"></img></div><div className="textDiv"><p><b>Add team member</b><br/><b> to this test</b></p></div></div>}
                            searchable={true}
                        	noResultsText={<div className="noResultFound"><span className="noResultText"> <b>TEAM member not found. </b><br/> Maybe he/she is not in your <u>team</u>?</span></div>}
                            //className={styles.selectorWidth}
                            options={USERS.map((USERS, index) => {
                                return (
                                    {
                                        value: USERS.id,
                                        label:USERS.username,
                                        email:USERS.email,
                                        picture:USERS.picture,
                                        role:USERS.role
                                       //<span className="someClass"><img src="http://localhost:3000/src/main/resources/META-INF/resources/js/data/avatar-default.png"></img>{" "+USERS.username}</span>
                                    }
                                )

                            }).sort(function (a, b) {
                                return a.label === b.label ? 0 : +(a.label > b.label) || -1;
                            })}
                        />

                    </div>
                      
                       
                      {this.state.items.length > 0 && (this.state.items.map((item, i) => (
                      <div className="addingTeamMember col-xs-6"><div className="imageBox"><div className="imageInn"><img className="img-back" src={item.picture}></img></div><div className="hoverImg"><img className="img-top"  src="http://localhost:3000/src/main/resources/META-INF/resources/js/data/removesign.png" onClick={() => this.deleteItem(item.value)}  alt="Card Front"></img></div></div><div className="infoRole">{item.role}</div><div className="infoName">{item.label}</div></div>
                        )))}
                      
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-xs-12">
                        {items.length>=5 && containerSize >= 225  && ( 
                                <button type="button" onClick={this.toggle} className="btn btn-lg btn-block">
                                {this.state.isOpen ? 'Show Less' : 'Show More'}
                              </button>
                              )}
                        </div>
                        </div>
                        </div>
                        
             );
    }
 
};

export default DropdownBox;

