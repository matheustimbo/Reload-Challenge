import React from 'react'
import { View, TextInput} from 'react-native'


export default class TransparentTextInput extends React.Component {
    render(){
        if(this.props.visible){
            return (
                <View style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    width: '60%',
                    borderRadius: 5,
                    height: 50,
                    marginTop: 24
                }}>
                    <TextInput
                        secureTextEntry={this.props.secureTextEntry}
                        placeholder={this.props.placeholder}
                        autoCapitalize="none"
                        style={{
                            color: 'white',
                            padding: 12,
                            width: '100%',
                            height: 50,
                        }}
                        onChangeText={this.props.onChangeText}
                        value={this.props.value}
                        placeholderTextColor="white"
                        onBlur={this.props.handleVisibility}
                        onSubmitEditing={this.props.handleVisibility}
                    />
                </View>
            )
        }else{
            return (<View/>)
        }
        
    }
    
}
