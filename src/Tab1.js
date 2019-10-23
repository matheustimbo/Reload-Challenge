import React from 'react'
import { View, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, Text} from 'react-native'
import TravelIcon from "../assets/svgs/travel.svg"
const { width, height } = Dimensions.get("window")

export default class Tab1 extends React.Component {

  render() {
    return (
        <View style={styles.scene} >
            <ImageBackground
                style={styles.imageBackground}
                imageStyle={styles.image}
                source={{uri: 'https://www.visiteosusa.com.br/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2017-05/23b0b0b9caaa07ee409b693da9bf9003.jpeg?itok=QUmOkiy_'}}
            >
                <View style={styles.travelIconWrap}>
                    <TravelIcon width="50" height="50"/>
                </View>
            </ImageBackground>
            <View style={styles.description}>
                <Text style={styles.city}>São Francisco</Text>
                <View style={styles.descWrap}>
                    <Text style={styles.desc}>São Francisco, no norte da Califórnia, é uma cidade com colinas situada na ponta de uma península cercada pelo Oceano Pacífico e pela Baía de São Francisco. Ela é conhecida pela névoa que dura o ano todo, pela emblemática Ponte Golden Gate, por seus bondinhos e por suas coloridas casas vitorianas. O Transamerica Pyramid no Distrito Financeiro é o arranha-céu mais conhecido da cidade. Na baía, encontra-se a Ilha de Alcatraz, onde ficava a famosa antiga prisão.</Text>
                </View>
            </View>
            <View style={styles.priceWrap}>
                <View style={styles.priceContainer}>
                    <View style={styles.priceDisplay}>
                        <Text style={styles.priceLabel}>Price:</Text>
                        <Text style={styles.priceText}>3.000 U$</Text>
                    </View>
                    
                    <TouchableOpacity>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                Buy
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
            
        </View>
    )
  }
}
const styles = StyleSheet.create({
    buttonText: {
        fontWeight: "600",
        color: 'white',
        fontSize: 18
    },
    button: {
        backgroundColor: "#6FC7D0",
        width: 100,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceLabel: {
        color: '#C5C5C7',
        fontSize: 16
    },
    priceText: {
        color: "#2B2F32",
        fontSize: 20,
        fontWeight: "500",
        marginTop: 8
    },
    priceDisplay: {
        alignItems: 'center'
    },
    priceContainer: {
        margin: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width - 60,
        alignItems: 'center'
    },
    priceWrap: {
        backgroundColor: 'white',
        width: width,
        height: height*0.15,
        position: 'absolute',
        left: 0,
        bottom: 0,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.12)',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomWidth: 0,
        alignItems: 'center',
    },
    city: {
        marginTop: 30,
        fontWeight: "600",
        fontSize: 24,
        color: 'rgba(0,0,0,0.72)'
    },
    desc: {
        color: "#C1C3C5",
        textAlign: 'center',
        marginTop: 24,
        fontWeight: "600",
        maxWidth: width*0.8
    },
    descWrap: {
        backgroundColor: '#F6F8FB',
        flex: 1,
        marginTop: 24,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        width: width,
        alignItems: 'center'
    },
    description: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: height*0.60,
        width: width,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    travelIconWrap: {
        marginTop: 12,
        marginLeft: 12
    },
    scene: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    imageBackground: {
        width: width,
        height: height*0.4,
    },
    image: {
        resizeMode: 'cover', 
    }
})