<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <!--<b-popover target="hist-score-popover"-->
      <!--placement="topright"-->
      <!--title="Instant score"-->
      <!--triggers="hover focus"-->
      <!--content="The instant score means probability with which the funds on the balance of this wallet are obtained illegally.  Instant score is recalculated each time new incoming transaction is received.">-->
      <!--</b-popover>-->
      <b-popover target="inst-score-popover"
                 placement="topright"
                 title="Historical score"
                 triggers="hover focus"
                 content="Historical score shows if there were any incoming transactions in the past that could contain funds obtained by illegal means.">
      </b-popover>

      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i>
              <strong> Web</strong>
              <div class="card-header-actions"></div>
            </div>
            <div>
              <p>
                In order to query scoring of wallet addresses you should have a positive account balance. Fee is
                automatically deducted from the account balance on "Per Query" basis. Check "Pricing" section for more
                details
              </p>

              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Currency"
                    label-for="basicSelect"
                    :label-cols="3"
                    :horizontal="true">
                    <b-form-select id="basicSelect"
                                   :plain="true"
                                   :options="['BTC', 'ETH']"
                                   v-model="currency"
                                   value="BTC">
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Wallet Address"
                    label-for="basicName"
                    :label-cols="3"
                    :horizontal="true">
                    <b-form-input id="basicName" type="text" autocomplete="name" v-model="address"
                                  placeholder="0X32DKDHF43F"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <div slot="footer">
                <b-button type="submit" size="md" variant="primary" @click="getScoring()">Check Scoring</b-button>
              </div>
            </div>
          </b-card>
          <b-card
            v-show="showDetails"
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i>
              <strong> Results</strong>
              <div class="card-header-actions"></div>
            </div>
            <b-row class="mb-3" v-if="scoring.wallet_state">
              <b-col cols="3">
                <strong>Balance:</strong>
              </b-col>
              <b-col cols="9">
                {{scoring.wallet_state.Balance}} {{currency}}
              </b-col>
            </b-row>
            <b-row class="mb-3" v-if="scoring.wallet_state">
              <b-col cols="3">
                <strong>Address:</strong>
              </b-col>
              <b-col cols="9">
                {{scoring.wallet_state.Address}}
              </b-col>
            </b-row>
            <b-row class="mb-3" v-if="scoring.wallet_state">
              <b-col cols="3">
                <strong>Last Incoming Transaction Id:</strong>
              </b-col>
              <b-col cols="9">
                {{scoring.wallet_state.TransactionId}}
              </b-col>
            </b-row>
            <b-row class="mb-4">
              <b-col cols="3">
                <strong>Instant score:</strong>
                <i class="fa fa-question-circle ml-1 popover-cursor"
                   id="inst-score-popover" variant="primary"></i>
              </b-col>
              <b-col cols="9" v-if="scoring.wallet_state">
                {{scoring.wallet_state.Score}}</b-col>
              <b-col cols="9" v-if="!scoring.wallet_state">
                0
              </b-col>
            </b-row>
            <b-row class="mb-4">
              <b-col cols="12" class="text-center">
                <div class="pull-right">
                  <b-button id="zoom_in" size="md" variant="primary" class="mr-2"><i class="fa fa-plus"></i></b-button>
                  <b-button id="zoom_out" size="md" variant="primary"><i class="fa fa-minus"></i></b-button>
                </div>
                <strong>Transaction Funds Flow:</strong>
              </b-col>
            </b-row>
            <b-row>
              <b-col colls="12" class="text-center" id="chartAreaWrapper">
                <svg width="1060" height="360" id="chart"></svg>
              </b-col>
            </b-row>
            <b-row v-if="selectedBranch">
              <div class="table-responsive-sm mt-4">
                <table class="table b-table table-bordered b-table-fixed">
                  <thead>
                    <tr>
                      <th>Score</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Amount</th>
                      <th>Tx</th>
                      <th>Case Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in selectedBranch.transactions">
                      <td>{{item.score}}</td>
                      <td>
                        <a v-bind:href="item.from | explorerAddressURL(scoring.currency)" target="new_blank"> {{item.from}}</a>
                      </td>
                      <td>
                        <a v-bind:href="item.to | explorerAddressURL(scoring.currency)" target="new_blank">{{item.to}}</a>
                      </td>
                      <td>{{item.amount}}</td>
                      <td>
                        <a v-bind:href="item.tx_id | explorerTxURL(scoring.currency)" target="new_blank">{{item.tx_id}}</a>
                      </td>
                      <td>
                        <!--<a v-bind:href="item.case_name | explorerCaseName()" target="new_blank">{{item.case_id}}</a>-->
                        <a href="https://safu-media.phenom.team/ECAF-Order-of-Emergency-Protection-2018-10-13-AO-015.pdf" target="new_blank">{{item.case_id}}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-row>

            <b-row class="mb-3 mt-3">
              <!--<b-col cols="12" class="text-center">-->
              <!--<strong>Historical score:</strong>-->
              <!--<i class="fa fa-question-circle ml-1 popover-cursor"-->
              <!--id="hist-score-popover" variant="primary"></i>-->
              <!--</b-col>-->
            </b-row>
            <!--scoring.result.transactions-->
            <!--<w-table :table-data="fields" :fields="fields" caption="<i class='fa fa-align-justify'></i> Submited cases"></w-table>-->
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import * as d3 from "d3v4";
  import * as Api from '@/api';
  import moment from 'moment';
  import wTable from './WebTable.vue';

  export default {
    name: 'web',
    components: {wTable},
    data() {
      return {
        scoring: {wallet_state: {Balance: 0}},
        showDetails: false,
        chartBuild: false,
        currency: 'ETH',
        address: '',
        selectedBranch: '',
        cases: {},
        fields: [
          {key: 'created_at_dt', label: 'Date', sortable: true},
          {key: 'txn_id', label: 'Incoming TxId', sortable: true},
          {key: 'score', label: 'Instant Score'}
        ],
      }
    },

    mounted() {

    },
    methods: {
      isElementVisible(id){
        var element = document.getElementById(id);
        return element.offsetWidth > 0 && element.offsetHeight > 0;
      },
      getScoring() {
        String.prototype.matchAll = function(regexp) {
          var matches = [];
          this.replace(regexp, function() {
            var arr = ([]).slice.call(arguments, 0);
            var extras = arr.splice(-2);
            arr.index = extras[0];
            arr.input = extras[1];
            matches.push(arr);
          });
          return matches.length ? matches : null;
        };

        if (this.address.length < 10) {
          toastr.error('Please, enter a valid wallet address.', 'Error!');
          return false;
        }
       
        Api.getScoring(this.currency, this.address)
          .then(response => {
            this.showDetails = true;
            this.scoring = response.result;
            this.scoring.currency = this.currency;
            this.selectedBranch = '';
            if (this.chartBuild) {
              d3.selectAll("svg > *").remove();
              this.buildChart();
            }

            // if you use interval in vue - you are useless.. i accept my destiny(
            var interval = setInterval(function(){
              if(this.isElementVisible('chartAreaWrapper')){
                clearInterval(interval); // kill timer block is shown
                this.buildChart();
                this.chartBuild = true;

                // we have to fetch all cases details
                var regexp = /"case_id":"(.*?)"/g;
                var cases = JSON.stringify(this.scoring).matchAll(regexp);
                for(let i=0; i<cases.length; i++){
                  if (typeof cases[i][1] !== 'undefined') {
                    Api.getInformCase(cases[i][1])
                      .then((response) => {
                        this.cases[cases[i][1]] = response;
                      })
                      .catch((e) => {
                        console.error(e)
                      });
                  }
                }
              }
            }.bind(this), 500);
          })
          .catch(response => {
            console.error(response);
          });
      },
      buildChart() {
        var div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        var stratify = d3.stratify()
          .parentId(function (d) {
            return d.id.substring(0, d.id.lastIndexOf("."));
          });

        var tree = d3.tree()
          .size([360, 500])
          .separation(function (a, b) {
            return (a.parent == b.parent ? 1 : 2) / a.depth;
          });

        var line = d3.line()
          .x(function (d, i) {
            return d.x;
          }) // set the x values for the line generator
          .y(function (d) {
            return d.y;
          }) // set the y values for the line generator
          .curve(d3.curveMonotoneX); // apply smoothing to the line

        var root = d3.hierarchy(this.scoring.tree);
        tree(root);

        let x0 = Infinity;
        let x1 = -x0;
        root.each(d => {
          if (d.x > x1) x1 = d.x;
          if (d.x < x0) x0 = d.x;
        });

        function zoomed() {
          g.attr("transform", d3.event.transform);
        }

        let zoom = d3.zoom().on("zoom", zoomed);

        /* chart */
        const svg = d3.select("#chart")
          .style("width", "100%")
          .style("height", "auto")
          .call(zoom)
          .on("wheel.zoom", null)
          .on("dblclick.zoom", null);

        d3.select("#zoom_in").on("click", function () {
          zoom.scaleBy(svg.transition().duration(750), 1.5);
        });
        d3.select("#zoom_out").on("click", function () {
          zoom.scaleBy(svg.transition().duration(750), 0.5);
        });

        // i need this for coordinates calculations and extra lines draw
        var mysvg = document.getElementById('chart');

        // translate page to SVG co-ordinate
        function svgPoint(element, x, y) {
          var pt = mysvg.createSVGPoint();
          pt.x = x;
          pt.y = y;
          return pt.matrixTransform(element.getScreenCTM().inverse());
        }

        var g = svg.append("g").attr("transform", `translate(200,0)`);

        var points = [];
        var pi = 0;
        var dy = 25; //root.y / 2 в примере root.dy у нас y = 0;
        var link = g.selectAll(".link")
          .data(root.descendants().slice(1))
          .enter().append("path")
          .attr("class", "link")
          .attr("d", function (d) {
            pi = pi + 1;
            d.id = pi;
            points.push(d);

            var ee = `
  M${d.y},${d.x}
  C${d.parent.y + dy},${d.x}
  ${d.parent.y + dy},${d.parent.x}
  ${d.parent.y},${d.parent.x}
  `
            return ee;
          })
          .style("cursor", 'pointer')
          .style("stroke", function (d) {
            let scores = [];
            for(let i = 0; i < d.data.transactions.length; i++ ){
              var item = d.data.transactions[i];
              scores.push(item.score)
            }
            let score = Math.max.apply(null, scores);
            d.color = (score > 10 ? "red" : "blue");
            return d.color;
          })
          .on("click", d => {
              this.selectedBranch = JSON.parse(JSON.stringify( d.data));
              // if(typeof d.data.transactions !== 'undefined' && d.data.transactions[0].case_id !== 'undefined'){
              //  window.open(context.cases[d.data.transactions[0].case_id].resolution_file, "_blank");
              // }
              })
              .on("mouseover", function (d) {
              showTooltip(d, 'txn');
              d3.select(this).style('stroke-width', '3px');
              })
              .on("mouseout", function (d) {
              hideToolTip(d);
              d3.select(this).style('stroke-width', '');
              })
              ;

              var node = g.selectAll(".node")
              .data(root.descendants())
              .enter().append("g")
              .attr("class", function (d) {
              return "node" + (d.children ? " node--internal" : " node--leaf");
              })
              .attr("transform", d => `translate(${d.y},${d.x})`);

              var circles = -1;
              node.append("circle")
              .attr("r", 5)
              .attr("id", function (d) {
              circles = circles + 1;
              return circles;
              })
              .style("cursor", 'pointer')
              .style("fill", function (d) {
              //return d.color;
              })
              .on("mouseover", function (d) {
              showTooltip(d, 'circle');
              })
              .on("mouseout", function (d) {
              hideToolTip(d);
              })
              .on("click", function (d) {
                this.selectedBranch = d.data;
              });

              let context = this;
              function showTooltip(d, type) {
              div.transition()
              .duration(100)
              .style("opacity", .9);

              var message = "Address: " + d.data.name;
              if (type === 'txn') {
              var message = "To address: " + d.data.name;
              if (d.data.transactions) {
              for (let i = 0; i < d.data.transactions.length; i++) {
                let item = d.data.transactions[i];
                if (i > 0)
                  message += "<div class='mt-3'>___________</div>";
                message += "<div class='mt-2'>Score: " + item.score + "</div>";
                message += "<div class='mt-2'>Tx: " + item.tx_id + "</div>";
                message += "<div class='mt-2'>Amount: " + item.amount + "</div>";

                //if(item.case_id != null) {
                //  message += "<div class='mt-2'><a href>To download resolution file click to transaction.</a></div>";
                //}
              }
            }
          }
          div.html(message)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        }

        function hideToolTip(d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        }

        node.append("text")
          .attr("dy", "0.31em")
          .attr("x", d => d.children ? -6 : 6)
          .attr("y", 0)
          .text(function (d) {
            return d.data.name.length > 28 ? d.data.name.substring(0, 28) + "..." : d.data.name;
          })
          .filter(d => d.children)
          .attr("text-anchor", "end");

        var getCoordinates = ($address) => {
          var circles = document.getElementsByTagName('circle');
          for (var i = 0; i <= circles.length; i++) {
            for (var c = 0; c <= points.length; c++) {
              if (typeof points[c] !== 'undefined' && points[c].data.name === $address && parseInt(circles[i].id) === parseInt(points[c].id)) {
                var coordinates = circles[i].getBoundingClientRect();
                var coordinatesSVG = svgPoint(mysvg, coordinates.x, coordinates.y);
                return {x: coordinatesSVG.x + 2.5, y: coordinatesSVG.y + 2.5};
              }
            }
          }
          return false;
        };

        // adding extra lines
        if (points.length > 0) {
          for (var i = 0; i < points.length; i++) {
            if (points[i].data.links.length > 0) {
              for (var c = 0; c < points[i].data.links.length; c++) {
                // we have to find coordinates of mentioned address
                var id = i;
                var source = getCoordinates(points[i].data.name);
                var destination = getCoordinates(points[i].data.links[c].name);

                var init = document.getElementsByTagName('circle')[0];
                var coordinates = init.getBoundingClientRect();
                var coordinatesSVG = svgPoint(mysvg, coordinates.x, coordinates.y);

                // Y distortion
                var middlepointY = 0;
                if (coordinatesSVG.y + 2.5 > destination.y) {
                  middlepointY = (destination.y - Math.abs(destination.y - source.y) / 2) * 1.1;
                } else {
                  middlepointY = (source.y + Math.abs(source.y - destination.y) / 2) * 1.1;
                }

                // X distortion
                var middlepointX = 0;
                if (destination.x !== source.x) {
                  middlepointX = source.x + Math.abs(source.x - destination.x) / 2;
                } else {
                  middlepointX = source.x - 10;
                  middlepointY = (destination.y - Math.abs(destination.y - source.y) / 2);
                }

                var middlepoint = {x: middlepointX, y: middlepointY};
                if (source && middlepoint && destination) {
                  svg.append("path")
                    .datum([source, middlepoint, destination])
                    .style("cursor", 'pointer')
                    .style("stroke", function (d) {
                      d.color = (points[i].data.links[c].score >= 10 ? "gray" : "red");
                      return d.color;
                    })
                    .on("click", function (d) {
                        this.selectedBranch = d.data;
                    }, points, id)
                    .on("mouseover", function (d) {
                      showTooltip(points[id], 'txn');
                      d3.select(this).style('stroke-width', '3px');
                    }, points, id)
                    .on("mouseout", function (d) {
                      hideToolTip(d);
                      d3.select(this).style('stroke-width', '');
                    })
                    .attr("class", "link")
                    .attr("d", line);
                }
              }
            }
          }
        }

        // adjust wrapper
        document.getElementById('chartAreaWrapper').style.height = (document.getElementsByTagName('svg')[0].clientHeight  || document.getElementsByTagName('svg')[0].offsetHeight) + 30 + 'px';
      }
    },
    filters: {
      normalDate: function (value) {
        if (!value) return '';

        return moment(value).format('YYYY-MM-DD HH:MM:SS');
      }
    }
  }

</script>


<style>

  svg {
    overflow: hidden;
  }

  .node circle {
    fill: #999;
  }

  .node text {
    font: 10px sans-serif;
  }

  .node--internal circle {
    fill: #555;
  }

  .node--internal text {
    text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
  }

  .link {
    fill: none;
    stroke: #555;
    stroke-opacity: 0.4;
    stroke-width: 3px;
    cursor: pointer;
  }

  link-negative {
    fill: none;
    stroke: red;
    stroke-opacity: 0.4;
    stroke-width: 1.5px;
  }

  .tooltip {
    position: absolute;
    text-align: left;
    padding: 8px;
    font: 10px sans-serif;
    background: #fff;
    border: solid 1px #aaa;
    border-radius: 3px;
    pointer-events: none;
  }
</style>
