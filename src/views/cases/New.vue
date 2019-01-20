<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Submit loss</strong>
              <div class="card-header-actions"></div>
            </div>
            <div>
              <p>
                <strong>There are two major cases why you may want to submit a new loss:</strong>
              </p>
              <p>
                <span class="ml-4"><i>1) If you lost control under your own funds and can provide implicit proof of ownership.</i></span>
                <br /><span class="ml-4"><i>2) In case you want to act as contributor and submit cases receiving up to 80% of fee from each
                scoring request related to this case.</i></span>
              </p>
              <p>
                Please provide detailed information regarding the case and describe all cercumstances that led to the
                loss.
              </p>
              <div v-loading="getAddCaseStatus">
                <b-alert show variant="success" v-if="isAddCaseSuccessfully && !isAddCaseFailure">
                  <h4 class="alert-heading">Well done!</h4>
                  <p>
                    Thanks for submission. Your case already made tempolarily effective and will be reviewed by administrator.
                  </p>
                  <hr>
                  <p class="mb-0">
                    If you haven't passed KYC, you have 24 hours to accomplish verification, otherwise your case will be automatically rejected
                  </p>
                </b-alert>

                <b-alert show variant="danger" v-if="isAddCaseFailure && !isAddCaseSuccessfully">
                  <h4 class="alert-heading">{{errorMessage}}</h4>
                </b-alert>

                <p>
                  <strong>Case Details:</strong>
                </p>
                <b-form-group
                  label="Currency"
                  label-for="basicSelect"
                  description="Please select case currency."
                  :label-cols="2"
                  :horizontal="true">
                  <b-form-select id="basicSelect"
                                :plain="true"
                                :options="currencyList"
                                v-model="selectedCurrency"
                                >
                  </b-form-select>
                </b-form-group>
                <b-form-group
                  description="Please specify transaction id of illegal transfer of the funds"
                  label="Transaction Id"
                  label-for="basicName"
                  :label-cols="2"
                  :horizontal="true">
                  <b-form-input id="basicName" type="text" v-model="txid"></b-form-input>
                </b-form-group>
                <b-form-group
                  v-if="selectedCurrency === 'BTC'"
                  description="Output address in an optional parameter
                    and is needed only for cases where a malicious transfer
                     of funds is part of a large transaction, such as a
                      withdrawal from the exchange, and definition of
                       specific output is needed. Leave this field blank
                        if all outputs are malicious"           
                  label="Output address(optional)"
                  label-for="basicName"
                  :label-cols="2"
                  :horizontal="true">
                  <b-form-input id="basicName" type="text" v-model="address"></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Owner of Funds"
                  label-for="basicCustomRadios1"
                  description="Switch this toggle to specify if you 
                  were the person/entity who originally owned
                   the funds related to this case."
                  :label-cols="2"
                  :horizontal="true">
                  <b-form-radio-group
                    id="basicCustomRadios1"
                    name="customRadioInline1">
                    <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" id="customRadioInline1" value="self" v-model="pickedOwner" edname="customRadioInline1" class="custom-control-input">
                      <label class="custom-control-label" for="customRadioInline1">My Own Funds</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" id="customRadioInline2" value="external" v-model="pickedOwner" name="customRadioInline1" class="custom-control-input" checked>
                      <label class="custom-control-label" for="customRadioInline2">External owner</label>
                    </div>
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group
                  v-if="pickedOwner === 'external'"
                  description=""
                  label="Email"
                  label-for="basicName"
                  :label-cols="2"
                  :horizontal="true">
                  <b-form-input id="basicName" type="text" v-model="email"></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Detailed Description"
                  label-for="basicName"
                  :label-cols="2"
                  :horizontal="true">
                  <b-form-textarea id="basicName" rows="6" type="text" v-model="comment"></b-form-textarea>
                </b-form-group>
                <b-form-group
                  label="Attached Documents"
                  label-for="basicName"
                  :label-cols="2"
                  :horizontal="true">
                  <vue-transmit
                                tag="section"
                                v-bind="options"
                                upload-area-classes="bg-faded"
                                ref="uploader">
                    <div class="drugAndDrop d-flex align-items-center justify-content-center w-100">
                      <span style="margin-right: 20px;" class="text-center">Please Drag and Drop the file to attach it to the case</span>
                      <button class="btn btn-primary"
                              @click="triggerBrowse">Upload Files</button>
                    </div>
                    <div style="opacity: 0; position: absolute;">{{files}}</div>

                    <div v-for="(file, i) in files" :key="file.id" :class="{'mt-5': i === 0}">
                      <div class="media">
                          <div class="drugAndDrop-img">
                            <img v-if="file.dataUrl" :src="file.dataUrl" class="img-fluid d-flex mr-2 mb-4" style="width: 50px; height: 50px;">
                            <i v-if="!file.dataUrl" class="fa fa-file-archive-o mr-2 mb-4" style="font-size: 50px;"></i>
                            <i @click="deleteFile(file.id)" class="fa fa-close deleteImg"></i>
                          </div>
                          <div class="media-body">
                            <div><b>Name:</b> {{ file.name }}</div>
                            <div><b>Size:</b> {{ file.size }}b</div>
                          </div>
                        </div>
                    </div>
                  </vue-transmit>
                </b-form-group>
                <div slot="footer">
                  <b-button type="submit" size="md" variant="primary" @click="sendNewCase">Submit</b-button>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import * as Api from '@/api';
  import { mapState } from 'vuex';
  import { validateEmail } from '@/utils/input_utils';

  export default {
    name: 'new',
    data() {
      return {
        isAddCaseFailure: false,
        isAddCaseSuccessfully: false,
        errorMessage: null,
        currencyList: ['BTC','ETH'],
        selectedCurrency: 'BTC',
        address: null,
        txid: null,
        email: '',
        pickedOwner: 'external',
        comment: null,
        files: [],
        options: {
          acceptedFileTypes: ['image/*', '.pdf', '.doc', '.docx'],
          uploadMultiple: true,
          clickable: false,
          adapterOptions: {
            url: '/',
          },
          // fix that the files are not automatically sent to the server
          uploadAdapter: (context) => {
            return { 
              uploadFiles: (files) => {
                return new Promise((resolve, reject) => {
                  for (let i = 0; i < files.length; i++) {
                    this.files.push(files[i]);
                    var file = files[i];
                    file.status = context.Statuses.Success;
                    file.endProgress();
                  }
                  return resolve({ ok: 1, data: { data: 'data' } })
                })
              }
            };
          }
        }
      }
    },
    watch: {
      email() {
        this.isAddCaseSuccessfully = false;
        this.isAddCaseFailure = false;
        this.errorMessage = '';
      }
    },
    mounted() {
      Api.getCurrencyList()
        .then((response) => {
          this.currencyList = response;
        })
        .catch(() => {});
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),

      getAddCaseStatus() {
        return this.$store.getters.LOADERS.includes('case');
      },
    },
    methods: {
      sendNewCase() {
        const data = {
          currency: this.selectedCurrency,
          txid: this.txid,
          type: this.pickedOwner,
          description: this.comment
        }

        if (this.email.length > 0) {
          if (!validateEmail(this.email)) {
            this.isAddCaseSuccessfully = false;
            this.isAddCaseFailure = true;
            this.errorMessage = 'E-mail is invalid';
            return;
          }
        }

        if(this.pickedOwner === 'external') {
          data.email = this.email;
        } else {
          data.email = this.user.email;
        }

        if(this.selectedCurrency === 'BTC') {
          data.address = this.address;
        }

        const blocker = 'case';

        for (let i = 0; i < this.files.length; i++) {
          if(this.files.length > 0  && this.files[i].size > 5000000) {
            this.isAddCaseSuccessfully = false;
            this.isAddCaseFailure = true;
            this.errorMessage = this.files[i].name + ' more 5Mb';
            return;
          }
        }

        Api.addNewCase(data, blocker)
          .then((response) => {
            this.isAddCaseSuccessfully = true;
            this.isAddCaseFailure = false;
            const caseId = response.id;
            
            for (let i = 0; i < this.files.length; i++) {

              Api.addFileToCase(caseId, {
                ['file']: this.files[i].nativeFile
              })
                .then(() => {
                  this.selectedCurrency = 'BTC';
                  this.txid = '';
                  this.pickedOwner = 'external';
                  this.comment = '';
                  this.email = '';
                  this.address = '';
                  this.files = [];
                })
                .catch(() => {});
            }

            this.selectedCurrency = 'BTC';
            this.txid = '';
            this.pickedOwner = 'external';
            this.comment = '';
            this.email = '';
            this.address = '';
          })
          .catch((error) => {
            this.isAddCaseSuccessfully = false;
            this.isAddCaseFailure = true;
            if(error){
              this.errorMessage = error.data;
            }
          });
      },
      triggerBrowse() {
        this.$refs.uploader.triggerBrowseFiles()
      },
      deleteFile(imgId) {
        const newFiles =  this.files.filter((file) => {
          return file.id !== imgId;
        })
        this.files = newFiles;
      }
    },
  }
</script>

<style>
  .drugAndDrop {
    height: 140px;
    border: 1px solid #e4e7ea; 
    border-radius: 0.25rem;
  }

  .drugAndDrop-img {
    position: relative;
  }

  .deleteImg {
    position: absolute;
    top: -7px;
    right: 5px;
    z-index: 100;

    color: #f63c3a;

    font-size: 18px;
    cursor: pointer;
  }
</style>

