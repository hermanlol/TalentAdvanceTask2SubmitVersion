import React from 'react';
import { Loader, Icon } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            location: {
                country: "",
                city: ""
            }
        }
    }


    render() {
        let employer = this.props.employer ? this.props.employer.companyContact : this.state;
        //console.log(this.props.employer);
        return (
            <div className="ui card">
                <div className="content">
                    <div className="center aligned header"><img className="ui tiny circular image" src="../images/image_gray.png" /></div>
                    <br/>
                    <div className="center aligned header">{employer.name}</div>
                    <div className="center aligned"><Icon name="point" />: {employer.location.city}, {employer.location.country}</div>
                    <div className="center aligned description">
                        <p>We currently do not have specific skills that we desire.</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="left aligned">
                        <Icon name="call" />: {employer.phone}
                    </div>
                    <div className="left aligned">
                        <Icon name="mail" />: {employer.email}
                    </div>
                </div>
            </div>
        )

    }
}