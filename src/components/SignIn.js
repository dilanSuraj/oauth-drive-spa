import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import Axios from "axios";
import common from "../utils/common";
import notificationAlertUtil from '../utils/notificationManager'
export default class SignInComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        }
    }
    async componentDidMount() {
        await Axios.get(`${common.BACKEND_API}${common.URL_ENDPOINT}/`,
            {
                headers: common.DEFAULT_HEADER_INFO
            }).then(res => {
                console.log(res)
                this.setState({
                    url: res.data
                })
            }).catch(error => {
                notificationAlertUtil.customErrorAlert("Error occurred")
            });
    }
    render() {
        return (
            <MDBContainer>
                <MDBRow center>
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody className="mx-4">
                                <div className="text-center">
                                    <h3 className="dark-grey-text mb-5">
                                        <strong>Sign in</strong>
                                    </h3>
                                </div>
                                <div className="text-center mb-3">
                                    <MDBBtn
                                        type="button"
                                        gradient="blue"
                                        href={this.state.url}
                                        rounded
                                        className="btn-block z-depth-1a"
                                    >
                                        Sign in
                    </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

};
