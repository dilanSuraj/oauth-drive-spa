import { Grid } from '@material-ui/core';
import Axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import common from '../utils/common';
import notificationAlertUtil from '../utils/notificationManager';
import imagefile from '../assets/imagefile.jpg';
import fileImg from '../assets/fileImg.jpg';
import ButtonAppBar from '../shared/customappheader';
import Swal from 'sweetalert2';
import auth from '../utils/auth';

export default class FilesComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            files: []
        }

    }



    uploadFile = async (files) => {
        const data = new FormData()
        await data.append('file', files[0])

        if (files[0] !== undefined) {
            await Axios.post(`${common.BACKEND_API}${common.FILE_ENDPOINT}/`,
                data,
                {
                    headers: common.FILE_HEADER_INFO
                }).then(async (res) => {
                    notificationAlertUtil.successAlert("File uploaded successfully")
                    await this.loadFiles();
                }).catch(error => {
                    notificationAlertUtil.customErrorAlert("Error occurred during file reading")
                });
        }

    }

    loadFiles = async () => {
        await Axios.get(`${common.BACKEND_API}${common.FILE_ENDPOINT}/`,
            {
                headers: common.API_HEADER_INFO
            }).then(res => {
                this.setState({
                    files: res.data
                })
            }).catch(error => {
                notificationAlertUtil.customErrorAlert("Please login again, Session timedout")
            });
    }

    async componentDidMount() {
        await this.loadFiles();
    }

    signOut = (e) =>{
        e.preventDefault()
        Swal.fire({
          title: 'Are you sure?',
          text: "Do you need to logout?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm'
        }).then((result) => {
          console.log(result)
          if (result.value) {
            auth.logout(() => {
              this.props.history.push('/register');
            });
          }
        })
      }

    render() {
        return (
            <React.Fragment>
                <ButtonAppBar signOut={this.signOut.bind(this)}/>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBCard>
                                <MDBCardBody className="mx-4">
                                    <div className="text-center mb-3">
                                        <MDBBtn
                                            type="button"
                                            gradient="blue"
                                            onClick={() => {
                                                this.loadFiles()
                                            }}
                                            rounded
                                            className="btn-block z-depth-1a"
                                        >
                                            Read My Drive
                </MDBBtn>
                                    </div>
                                    <DropzoneArea
                                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                        maxFileSize={5000000}
                                        showAlerts={false}
                                        onAlert={(err, type) => {
                                            if (type == 'error') {
                                                notificationAlertUtil.customErrorAlert(err);
                                            }
                                        }}
                                        onChange={this.uploadFile.bind(this)}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center>
                        {
                            this.state.files && this.state.files.map((file, index) => {
                                return (<Grid item key={index} xs={4}>
                                    <MDBCard border={"1px"}>
                                        {
                                            file.mimeType == "image/png" ?
                                                <MDBCardImage className="img-fluid" src={imagefile} A />
                                                :
                                                <MDBCardImage className="img-fluid" src={fileImg} />

                                        }
                                        <MDBCardBody>
                                            <MDBCardFooter>{file.name}</MDBCardFooter>
                                        </MDBCardBody>
                                    </MDBCard>
                                </Grid>)
                            })
                        }
                    </MDBRow>
                </MDBContainer >
            </React.Fragment>

        );
    }

}