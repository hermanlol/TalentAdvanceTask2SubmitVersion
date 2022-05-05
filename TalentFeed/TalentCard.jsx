import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            talentSnap: {
                name: "",
                employer: "",
                visa: "",
                currentEmployment: "",
                photoId: "",
                skills: []
            },
            defaultView: true,
            profileView: false
        };

        this.changeView = this.changeView.bind(this);
    };

    changeView() {
        if (this.state.defaultView) {
            this.setState({
                defaultView: false,
                profileView: true
            });
        }
        if (this.state.profileView) {
            this.setState({
                defaultView: true,
                profileView: false
            });
        }
    }

    render() {
        let talentSnap = this.props.talentSnap ? this.props.talentSnap : this.state.talentSnap;
        return (
            <div className="ui card talent-card">
                <div className="content">
                    <div className="header">{talentSnap.name}<i className="star right floated large icon"></i></div>
                </div>
                <div className="content" style={{ minHeight: 350, padding: 0 }}>
                    {this.state.defaultView ?
                        <ReactPlayer
                            className='react-player'
                            url='example.mp4'
                            width='100%'
                            height='350px'
                            controls={true}
                    /> : null}
                    {this.state.profileView ?
                        <div className="ui grid container">
                            <div className="eight wide column" style={{ paddingLeft: 0 }}>
                                {talentSnap.photoId ? <img src={talentSnap.photoId} height="350px" width="275px" alt="Logo" /> : <img src="../images/image_gray.png" height="350px" width="275px" alt="Logo" /> }
                            </div>
                            <div className="eight wide column">
                                <div className="left aligned header" style={{paddingTop: 15, paddingBottom: 15}}>
                                    <h4>Talent Snapshot</h4>
                                </div>
                                <div className="left aligned">
                                    <p>
                                        CURRENT EMPLOYER
                                        <br />
                                        {talentSnap.currentEmployment}
                                    </p>

                                    <p>
                                        VISA STATUS
                                        <br/>
                                        {talentSnap.visa ? talentSnap.visa : "Not Available" }
                                    </p>

                                    <p>
                                        POSITION
                                        <br/>
                                        {talentSnap.level}
                                    </p>
                                </div>
                            </div>
                        </div>
                        : null}

                </div>
                <div className="content">
                    <div className="ui grid container">
                        <div className="four wide column">
                            <div className="text center" onClick={this.changeView}>
                                {this.state.defaultView ? <i className="ui talent-card talent-detail-snapshot user large icon"></i> : null}
                                {this.state.profileView ? <i className="ui talent-card talent-detail-snapshot video large icon"></i> : null}
                            </div>
                        </div>
                        <div className="four wide column">
                            <div className="text center">
                                <i className="ui talent-card talent-detail-snapshot file pdf outline large icon"></i>
                            </div>
                        </div>
                        <div className="four wide column">
                            <div className="text center">
                                <i className="ui talent-card talent-detail-snapshot linkedin large icon"></i>
                            </div>
                        </div>
                        <div className="four wide column">
                            <div className="text center">
                                <i className="ui talent-card talent-detail-snapshot github large icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="extra content">
                    {talentSnap.skills ? talentSnap.skills.map((skill) =>
                        <button className="ui compact blue mini basic button">{skill}</button>
                     ): null}
                </div>
            </div>
        )
    }
}

