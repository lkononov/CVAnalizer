import React from 'react';
import Cookies from 'universal-cookie';    
import axios from 'axios';

class Projects extends React.Component {

    componentWillMount() {
        axios.post('/api/Test',
            {
            }
        )
            .then((res) => {
                console.log("this is res", res);                
            }).catch((err) => {
                this.props.history.push("/auth");
            });      
    }
    render() {
        return (
            <div>Projects element!</div>
        );
    }
};
export default Projects;