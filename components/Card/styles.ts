import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
export const ITEM_WIDTH = width * 0.7;
const CARD_HEIGHT = 600;

export default StyleSheet.create({
  cardContainer: {
    width: ITEM_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    marginHorizontal: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
  },
  image: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  textContainer: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
