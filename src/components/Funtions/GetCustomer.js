import { prefix_link } from "variables/globalesVar";


async function GetClient() {

    try {
      
      const response = await fetch( prefix_link+'/api/v1/clients', {
        method: 'GET'
       
        
      });

      if (!response.ok) {
        //throw new Error('Network response was not ok');
        console.log('Response from Flask API:', /*data[0].customer*/);
      }

      const data = await response.json();

      console.log('Response from Flask API:', data[0].customer);


} catch (error) {
  console.error('Une erreur s\'est produite : ', error);
}



}
export default GetClient;