# Kubernetes Exercises

## 1. Create a Deployment

- 📖 [Deployment documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- 🤔 *Exercise file: /Exercises/Kubernetes/1-Deployment.yaml*
- 😏 *Solution file: /Solutions/Kubernetes/1-Deployment.yaml*

> Usually you don't create a Pod directly. Instead you create a controller (a Kubernetes object which manages other Kubernetes objects). The controller that's most often used for managing Pods is a **Deployment**, which enables easy application updates and scaling.

Create two Kubernetes Deployments, one for the webapp and one for the webapi. Use the Docker container images that we've build before during the Docker exercises. 

1. Edit the Kubernetes manifest in the exercise file and use the `kubectl apply` command to create the Deployments in your cluster.

2. Check the Deployments:
   
```
kubectl get deployments
```

3. Check the Pods that are created by the Deployments:

```
kubectl get pods
```

4. Delete the webapp Pod:

```
kubectl delete pod webapp
```

5.  Check the webapp Pod again. When you delete a Pod that is controlled by a Deployment, the Deployment will see there is no Pod that matches its label selector, so it creates a new one.
```
kubectl get pod webapp
```

## 2. Create a ClusterIP Service

- 📖 [Service documentation](https://kubernetes.io/docs/concepts/services-networking/service/)
- 🤔 *Exercise file: /Exercises/Kubernetes/2-Service-ClusterIP.yaml*

> Communicating directly between Pods is cumbersome because the IP address of a Pod only exists for the lifetime of the Pod. A **Service** provides a static IP address linked to a DNS name and routes traffic into Pods. **ClusterIP** is the default type of a Service and gets an IP address which is only accessible *within* the cluster.

Create a ClusterIP Service to enable communication between the webapp and webapi.

1. Set up port forwarding to the webapp in your cluster:

```
kubectl port-forward pods/webapp 8080:80
```

1. Visit the webapp in your browser on http://localhost:8080. The webapp will load, but it will not be able reach the webapi. The webapp tries to communicate with the webapi using the domain name 'webapi', but this name is not registered yet with the internal DNS of Kubernetes.

2. Create a ClusterIP Service for the webapi Pod using the Kubernetes manifest in the exercise file and the `kubectl apply` command. Confirm that the webapp is working correctly.

## 3. Create a NodePort Service

- 📖 [Service documentation](https://kubernetes.io/docs/concepts/services-networking/service/)
- 🤔 *Exercise file: /Exercises/Kubernetes/3-Service-NodePort.yaml*
- 😏 *Solution file: /Solutions/Kubernetes/3-Service-NodePort.yaml*

> **NodePort** is a type of Service that you can use to listen for traffic coming into the cluster and direct it to a Pod. Using a NodePort Service, every node in the cluster will listen on the specified port and send traffic to the target port of the Pod.

Create a NodePort Service to listen for traffic coming into your cluster and direct it to the webapp Pod.

1. Edit the Kubernetes manifest in the exercise file and use the `kubectl apply` command to create the NodePort Service.

2. Get the external IP address from the NodePort Service:

```
kubectl get service webapp
```

1. Visit the webapp in your browser, but this time without port-forwarding. Use the external IP address from the NodePort Service and port 30000. Confirm that it's working correctly.

## 4.

- 🤔 *Exercise file: /Exercises/Kubernetes/4-Deployment-Rolling-Update.yaml*
- 😏 *Solution file: /Solutions/Kubernetes/4-Deployment-Rolling-Update.yaml*

...

## 5. Configuring a Liveness Probe

- 📖 [Liveness, Readiness and Startup Probes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- 🤔 *Exercise file: /Exercises/Kubernetes/5-Deployment-Liveness-Probe.yaml*
- 😏 *Solution file: /Solutions/Kubernetes/5-Deployment-Liveness-Probe.yaml*

> Kubernetes provides different types of probes to check the health of your application and act upon it. A **Liveness Probe** is used to restart a container when it's in a broken state (e.g. in case of a deadlock).

Configure a Liveness probe for your webapi Deployment.

1. Check the Kubernetes manifest in the exercise file to see how a Liveness Probe is configured and update your webapi using the `kubectl apply` command.

2. Visit the webapp in your browser via the NodePort Service. The webapp will load, but it will not be able reach the webapi.

3. Find out what's happening with the webapi Pod by executing the  following command a few times:

```
kubectl get pod webapi
```

4. Edit the Kubernetes manifest in the exercise file to fix the error and update your Deployment again with `kubectl apply`. Confirm that the webapi is running and not continuously restarting anymore.

## 6.

- 🤔 *Exercise file: /Exercises/Kubernetes/6-ConfigMap-Environment-Variable.yaml*
- 😏 *Solution file: /Solutions/Kubernetes/6-ConfigMap-Environment-Variable.yaml*

...

## 7.

- 🤔 *Exercise file: /Exercises/Kubernetes/7-ConfigMap-File.yaml*
- 😏 *Solution file: /Solutions/Kubernetes/7-ConfigMap-File.yaml*

...
