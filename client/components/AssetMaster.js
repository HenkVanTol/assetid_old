import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import moment from 'moment';
import { Form, Row, Col, Input, Button, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import FormItemTextInput from './common/FormItemTextInput';
import FormItemCombo from './common/FormItemCombo';
import FormItemLabel from './common/FormItemLabel';
import FormItemDatePicker from './common/FormItemDatePicker';

import mutation from '../mutations/CreateAssetMaster';
import hierarchyTypeQuery from '../queries/HierarchyType';

class AssetMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hierarchyTypeId: 0, masterId: 0, classId: 0, name: '',
            description: '', serial: '', registration: '', acquisitionDate: moment(), retirementDate: moment(), purchasePrice: 0,
            purchaseOrderNumber: '', creatorId: 0, hierarchyTypes: [], hierarchyTypeId: 0, errors: []
        };

        this.props.client.query({
            query: hierarchyTypeQuery
        }).then((result) => {
            this.state.hierarchyTypes = result.data.hierarchyType;
        });
    }
    onSubmit(event) {
        event.preventDefault();
        const { name, description, serial, registration, acquisitionDate, retirementDate, hierarchyTypeId } = this.state;
        this.props.client.mutate({
            mutation,
            variables: { name, description, serial, registration, acquisitionDate, retirementDate, hierarchyTypeId }
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors }); //es6: name value is the same
        });
    }
    renderHierarchyTypes() {
        return (
            this.state.hierarchyTypes.map(type => {
                return <Option key={type.id} value={type.id}>{type.description}</Option>;
            })
        );
    }
    render() {
        if (this.props.data.loading) {
            return (
                <div>Loading...</div>
            )
        }
        else {
            return (
                <div>
                    Master
                    <Form layout="inline" onSubmit={this.onSubmit.bind(this)}>
                        <Row>
                            <FormItemLabel value="Hierarchy Type: " />
                            <Col span={1} />
                            <FormItemCombo value={this.state.hierarchyTypeId} onChange={(value) => this.setState({ hierarchyTypeId: value })}
                                renderOptions={this.renderHierarchyTypes.bind(this)} />
                            <Col span={1} />
                            <FormItemLabel value="Master: " />
                            <Col span={1} />
                            <FormItemTextInput value={this.state.masterId} onChange={e => this.setState({ masterId: e.target.value })} />
                            <Col span={1} />
                        </Row>

                        <Row>
                            <FormItemLabel value="Class: " />
                            <Col span={1} />
                            <FormItemTextInput value={this.state.classId} onChange={e => this.setState({ classId: e.target.value })} />
                            <Col span={1} />
                            <FormItemLabel value="Name: " />
                            <Col span={1} />
                            <FormItemTextInput value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                            <Col span={1} />
                        </Row>

                        <Row>
                            <FormItemLabel value="Serial: " />
                            <Col span={1} />
                            <FormItemTextInput value={this.state.serial} onChange={e => this.setState({ serial: e.target.value })} />
                            <Col span={1} />
                            <FormItemLabel value="Description: " />
                            <Col span={1} />
                            <FormItemTextInput value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
                            <Col span={1} />
                        </Row>

                        <Row>
                            <FormItemLabel value="Registration: " />
                            <Col span={1} />
                            <FormItemTextInput value={this.state.registration}
                                onChange={e => this.setState({ registration: e.target.value })} />
                            <Col span={1} />
                            <FormItemLabel value="Acquisition Date: " />
                            <Col span={1} />
                            <FormItemDatePicker value={this.state.acquisitionDate}
                                onChange={(date, dateString) => { this.setState({ acquisitionDate: date }) }} />
                            <Col span={1} />
                        </Row>

                        <Row>
                            <FormItemLabel value="Retirement Date: " />
                            <Col span={1} />
                            <FormItemDatePicker value={this.state.retirementDate}
                                onChange={(date, dateString) => this.setState({ retirementDate: date })} />
                            <Col span={1} />
                            <FormItemLabel value="Purchase Price: " />
                            <Col span={1} />
                            <FormItemTextInput value={this.state.purchasePrice}
                                onChange={e => this.setState({ purchasePrice: e.target.value })} />
                            <Col span={1} />
                        </Row>

                        <Row>
                            <FormItemLabel value="Purchase Order: " />
                            <Col span={1} />
                            <FormItemTextInput value={this.state.purchaseOrderNumber}
                                onChange={e => this.setState({ purchaseOrderNumber: e.target.value })} />
                            <Col span={1} />
                            <FormItemLabel value="Creator: " />
                            <Col span={1} />
                            <FormItemTextInput value={this.state.creatorId}
                                onChange={e => this.setState({ creatorId: e.target.value })} />
                            <Col span={1} />
                        </Row>

                        <Row>
                            <Button type="primary" style={{ width: '100%' }} size="large" htmlType="submit" >Submit</Button>
                            <div className="errors">
                                {this.state.errors.map(error => <div key={error}>{error}</div>)}
                            </div>
                        </Row>
                    </Form>
                </div>
            );
        }
    }
}

export default withApollo(AssetMaster);