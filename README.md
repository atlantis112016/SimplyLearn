# SimplyLearn

<B>Pour les notifications locales:</B>
<br>installer dans nodeJs :
<br>cordova plugin add de.appplant.cordova.plugin.local-notification
<br>copier dans le dossier app/js le fichier : ng-cordova.min.js

<br>dans index.html ajouter la ligne :     
<br><script src="js/ng-cordova.min.js"></script> en dessous de cordova.js

<br>Puis ajouter à votre apps.js dans angular.module ''ngCordova'

<br><B>Pour le stockage en locale</B>
<br>npm install ngstorage
<br>Puis ajouter à votre apps.js dans angular.module 'ngstorage'
