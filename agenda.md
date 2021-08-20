# Agenda
## BLOK 1 (1u):
### Docker
* (5-10 min) Docker theorie
* (20-25 min) Docker workshop:
  * Een Angular app en .NET Core API containeriseren.
  * Extra: Angular app en .NET Core API combineren m.b.v. docker-compose.
 
### Kubernetes
 * (15-20 min) Kubernetes theorie
 
(Pauze tot aan blok 2)

## BLOK 2 (1u30)
### Kubernetes
* Kubernetes workshop:
  * De container images uit BLOK 1 deployen met een 'Deployment'.
  * Aanmaken van 2 ClusterIP Services die communicatie tussen Angular app en .NET Core API mogelijk maakt.
  * Eerst de werkende app bekijken via port-forwarding. Daarna een NodePort Service aanmaken en via deze service de werkende app bekijken (zonder port-forwarding).
  * Een nieuwe versie maken van de app of api met een kleine aanpassing. Hier een nieuwe Docker image voor builden met een nieuwe tag (bv. :v2) en de 'Deployment' spec aanpassen met deze nieuwe tag. Hierna kunnen we een rolling update waarnemen (bv. in Kubernetes Dashboard of Lens)
  * Toevoegen van health checks d.m.v. een probe op de 'Deployment' spec van de .NET Core API. Probe laten verwijzen naar de /unhealthy endpoint op de .NET Core app. Waarnemen hoe Kubernetes de container zal blijven heropstarten. Hierna probe laten verwijzen naar de /healthy endpoint en waarnemen hoe de Pod healthy zal worden en klaar om API requests af te handelen.
  * Een bepaalde appsetting overschrijven door een ConfigMap aan te maken die beschikbaar wordt gemaakt voor de container als environment variable. Hierna hetzelfde maar dan i.p.v. als environment variable als bestand gemount via een Volume in de Pod. Deze appsetting tonen in de app zodat we kunnen waarnemen dat het overschrijven van de appsetting daadwerkelijk gelukt is.
* Extra: Woordje uitleg over Helm
