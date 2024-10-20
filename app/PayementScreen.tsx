import React from 'react';
import { View, Button, Alert } from 'react-native';
// import { useStripe } from '@stripe/stripe-react-native';

export default function PaymentScreen() {
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();

//   const initializePaymentSheet = async () => {
//     // Appel à l'API backend pour créer une session de paiement
//     const response = await fetch('http://localhost:8080/panier/save-commande', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const { clientSecret } = await response.json();
//   };

//   const openPaymentSheet = async () => {
//     const { error } = await presentPaymentSheet();

//     if (error) {
//       Alert.alert(`Erreur lors du paiement: ${error.message}`);
//     } else {
//       Alert.alert('Paiement effectué avec succès !');
//     }
//   };

  return (
    <View>
      <Button title="Payer maintenant" />
      <Button title="Procéder au paiement" />
    </View>
  );
};
