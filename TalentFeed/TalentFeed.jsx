import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            /*load Position set to 1004 due to a lot of user profile don't have any details*/
            loadPosition: 1004,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null
        }

        this.init = this.init.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.loadCompanyData = this.loadCompanyData.bind(this);
        this.loadTalentData = this.loadTalentData.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        this.loadCompanyData((res) => {
            if (res) {
                this.setState(
                    { companyDetails: res.employer }
                );
            }
        });
        console.log("this is the loadNumber" + this.state.loadNumber);
        this.loadTalentData((res) => {
            if (res) {
                let newLoadPosition = this.state.loadPosition + this.state.loadNumber;
                this.setState(
                    {
                        feedData: res.data,
                        loadPosition: newLoadPosition
                    });
            }
        })
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.init()
    };

    loadCompanyData(callback) {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                callback(res);

            }.bind(this),
            error: function (res) {
                //console.log(res.status)
            }.bind(this),
        });
    }

    loadTalentData(callback) {
        //debugger;
        console.log("this is the loadposition: " + this.state.loadPosition);
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            data: { position: this.state.loadPosition, number: this.state.loadNumber },
            success: function (res) {
                console.log("success")
                console.log(res);
                callback(res);

            }.bind(this),
            error: function (res) {
                console.log("fail");
                console.log(res);
            }.bind(this),
        });
    }

    handleScroll() {

        const win = $(window);
        if ((($(document).height() - win.height()) == Math.round(win.scrollTop())) || ($(document).height() - win.height()) - Math.round(win.scrollTop()) == 1) {
            $("#load-more-loading").show();
            //load ajax and update states

            this.loadTalentData((res) => {
                if (res) {
                    let data = Object.assign([], this.state.feedData);
                    data = data.concat(res.data);
                    let newLoadPosition = this.state.loadPosition + this.state.loadNumber;
                    this.setState(
                        {
                            feedData: data,
                            loadPosition: newLoadPosition
                        });
                }
            })
            //call state and update state;
            //console.log(this.state.)
        }
    };


    render() {
        //debugger;
        let length = this.state.feedData.length;
        console.log(this.state.feedData)
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData} onScroll={this.handleScroll}>
                <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <CompanyProfile employer={this.state.companyDetails} />
                    </div>
                    <div className="eight wide column">
                        {length === 0 ? <p>There are no talents found for your recruitment company</p> : this.state.feedData.map((data) => (<TalentCard talentSnap={data} />))}
                    </div>
                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion />
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}