import React from 'react'
import { View, Text, Dimensions, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get("window")

const CITIES = [
    {
        title: 'San Francisco',
        content: 'São Francisco, no norte da Califórnia, é uma cidade com colinas situada na ponta de uma península cercada pelo Oceano Pacífico e pela Baía de São Francisco. Ela é conhecida pela névoa que dura o ano todo, pela emblemática Ponte Golden Gate, por seus bondinhos e por suas coloridas casas vitorianas. O Transamerica Pyramid no Distrito Financeiro é o arranha-céu mais conhecido da cidade. Na baía, encontra-se a Ilha de Alcatraz, onde ficava a famosa antiga prisão.',
    },
    {
        title: 'San Francisco',
        content: 'São Francisco, no norte da Califórnia, é uma cidade com colinas situada na ponta de uma península cercada pelo Oceano Pacífico e pela Baía de São Francisco. Ela é conhecida pela névoa que dura o ano todo, pela emblemática Ponte Golden Gate, por seus bondinhos e por suas coloridas casas vitorianas. O Transamerica Pyramid no Distrito Financeiro é o arranha-céu mais conhecido da cidade. Na baía, encontra-se a Ilha de Alcatraz, onde ficava a famosa antiga prisão.',
    },
    {
        title: 'San Francisco',
        content: 'São Francisco, no norte da Califórnia, é uma cidade com colinas situada na ponta de uma península cercada pelo Oceano Pacífico e pela Baía de São Francisco. Ela é conhecida pela névoa que dura o ano todo, pela emblemática Ponte Golden Gate, por seus bondinhos e por suas coloridas casas vitorianas. O Transamerica Pyramid no Distrito Financeiro é o arranha-céu mais conhecido da cidade. Na baía, encontra-se a Ilha de Alcatraz, onde ficava a famosa antiga prisão.',
    },
    {
        title: 'San Francisco',
        content: 'São Francisco, no norte da Califórnia, é uma cidade com colinas situada na ponta de uma península cercada pelo Oceano Pacífico e pela Baía de São Francisco. Ela é conhecida pela névoa que dura o ano todo, pela emblemática Ponte Golden Gate, por seus bondinhos e por suas coloridas casas vitorianas. O Transamerica Pyramid no Distrito Financeiro é o arranha-céu mais conhecido da cidade. Na baía, encontra-se a Ilha de Alcatraz, onde ficava a famosa antiga prisão.',
    },
    {
        title: 'San Francisco',
        content: 'São Francisco, no norte da Califórnia, é uma cidade com colinas situada na ponta de uma península cercada pelo Oceano Pacífico e pela Baía de São Francisco. Ela é conhecida pela névoa que dura o ano todo, pela emblemática Ponte Golden Gate, por seus bondinhos e por suas coloridas casas vitorianas. O Transamerica Pyramid no Distrito Financeiro é o arranha-céu mais conhecido da cidade. Na baía, encontra-se a Ilha de Alcatraz, onde ficava a famosa antiga prisão.',
    },
    {
        title: 'San Francisco',
        content: 'São Francisco, no norte da Califórnia, é uma cidade com colinas situada na ponta de uma península cercada pelo Oceano Pacífico e pela Baía de São Francisco. Ela é conhecida pela névoa que dura o ano todo, pela emblemática Ponte Golden Gate, por seus bondinhos e por suas coloridas casas vitorianas. O Transamerica Pyramid no Distrito Financeiro é o arranha-céu mais conhecido da cidade. Na baía, encontra-se a Ilha de Alcatraz, onde ficava a famosa antiga prisão.',
    },
    
];

export default class Loading extends React.Component {

    constructor(){
        super();
        this.state = {
            activeSections: [],
            cities: []
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        setTimeout(()=>{ 
            this.setState({
                cities: CITIES
            }) 
        }, 600);
    }

    logout(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            this.props.navigation.navigate('Loading')
        }).catch(function(error) {
            // An error happened.
            console.log("error:")
            console.log(error)
        });
    }


    _renderHeader(section, index, isActive, sections) {
        return (
          <Animatable.View
            duration={300}
            transition="backgroundColor"
            style={styles.singleAccordion}>
                
                <ImageBackground
                    style={styles.imageBackground}
                    imageStyle={styles.image}
                    source={{uri: 'https://www.visiteosusa.com.br/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2017-05/23b0b0b9caaa07ee409b693da9bf9003.jpeg?itok=QUmOkiy_'}}
                >
                    <Text style={styles.headerText}>{section.title}</Text>
                </ImageBackground>
                {!isActive &&
                    <View style={styles.smallDescContainer}>
                        <Text 
                        numberOfLines={1}
                        style={styles.smallDesc}>{section.content}</Text>
                        <Text style={styles.seeMore}>See more</Text>
                    </View>
                }
          </Animatable.View>
        );
      }
    
      _renderContent(section, i, isActive, sections) {
        return (
          <Animatable.View
            style={styles.fullContentView}>
            <Animatable.Text
              easing="ease-out"
              style={styles.fullDesc}
              >
              {section.content}
            </Animatable.Text>
          </Animatable.View>
        );
      }

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <View style={[styles.scene]}>
                
                <ScrollView
                    style={styles.scrollView}
                >
                    <View style={styles.accordionsWrapper}>
                        <Accordion
                            sections={this.state.cities}
                            activeSections={this.state.activeSections}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            onChange={this._updateSections}
                            underlayColor="#FFF"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={()=>{
                            this.logout()
                        }}
                    >
                        <Text style={styles.logout}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
                
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    logout:{
        color: 'red',
        marginRight: 8,
        fontSize: 16,
        fontWeight: "500",
        marginVertical: 64,
        alignSelf: 'center'
    },
    logoutBar: {
        width: width,
        height: 40,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    seeMore: {
        alignSelf: 'center', 
        marginTop: 4,
        color: '#4169E1',
        fontWeight: '600'
    },
    fullContentView: {
        width: width*0.8,
        backgroundColor: '#B9CFEF',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        padding: 12,
        paddingBottom: 20
    },
    fullDesc: {
        color: 'white',
        fontSize: 14,
        maxWidth: width*0.8
    },
    smallDesc: {
        color: 'white',
        fontSize: 14,
        maxWidth: width*0.8
    },
    headerText: {
        color: 'white',
        position: 'absolute',
        right: 20,
        bottom: 10,
        fontWeight: "700",
        fontSize: 20
    },
    smallDescContainer: {
        width: width*0.8,
        backgroundColor: '#B9CFEF',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        padding: 8,
        paddingVertical: 14
    },
    singleAccordion: {
        marginTop: 24
    },
    accordionsWrapper: {
        alignItems: 'center',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    scrollView: {
        width: width,
        height: height
    },
    scene: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageBackground: {
        width: width*0.8,
        height: height*0.12
    },
    image: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    }
})