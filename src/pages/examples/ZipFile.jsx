import React, {Component} from 'react';
import {compressImageToSize, getImageFileInfo} from 'zk-react/utils/image-utils';

export const PAGE_ROUTE = '/example/zip-file';
export class LayoutComponent extends Component {
    state = {
        images: [],
    }

    componentDidMount() {

    }

    handleChange = (e) => {
        const images = [...this.state.images];
        if (!e.target.files) return;
        Array.from(e.target.files).forEach(f => getImageFileInfo(f, (info, err) => {
            if (err) return;
            compressImageToSize({
                data: info.data,
                type: info.type,
            }).then(imageData => {
                images.push(<span><img src={imageData} alt={info.name}/> data size: {imageData.length / 1024} K</span>);
                this.setState({images});
            });
        }));
        // 清空value 允许上传相同文件
        e.target.value = '';
    }

    render() {
        const {images} = this.state;
        return (
            <div>
                <input type="file" multiple onChange={this.handleChange}/>
                {images.map((item, index) => <div key={index}>{item}</div>)}
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        ...state,
    };
}