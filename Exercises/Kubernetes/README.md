# Kubernetes Exercises

## 1. Running applications: Create a Deployment

- 📖 [Deployment documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- 🤔 _Exercise file: /Exercises/Kubernetes/1-Deployment.yaml_
- 😏 _Solution file: /Solutions/Kubernetes/1-Deployment.yaml_

> Usually you don't create a Pod directly. Instead you create a controller (a Kubernetes object which manages other Kubernetes objects). The controller that's most often used for managing Pods is a **Deployment**, which enables easy application updates and scaling.

Create two Kubernetes Deployments, one for the Angular app (webapp) and one for the .NET api (webapi). Use the Docker container images that we've build before during the Docker exercises.

1. Edit the Kubernetes manifest in the exercise file and use the `kubectl apply` command to create the Deployments in your cluster:

```
kubectl apply -f ./Exercises/Kubernetes/1-Deployment.yaml
```

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
kubectl delete pod -l app=webapp
```

5.  Check the webapp Pod again. When you delete a Pod that is controlled by a Deployment, the Deployment will see there is no Pod that matches its label selector, so it creates a new one.

```
kubectl get pod -l app=webapp
```

## 2. Internal traffic: Create a ClusterIP Service

- 📖 [Service documentation](https://kubernetes.io/docs/concepts/services-networking/service/)
- 🤔 _Exercise file: /Exercises/Kubernetes/2-Service-ClusterIP.yaml_

> Communicating directly between Pods is cumbersome because the IP address of a Pod only exists for the lifetime of the Pod. A **Service** provides a static IP address linked to a DNS name and routes traffic into Pods. **ClusterIP** is the default type of a Service and gets an IP address which is only accessible _within_ the cluster.

Create a ClusterIP Service to enable communication between the webapp and webapi.

1. Check the logs of the webapp Pod using the `kubectl logs` command below. You'll see that the reverse proxy (Nginx) can't find the upstream host with domain name 'webapi'. The problem is that this name is not registered yet with the internal DNS of Kubernetes.

```
kubectl logs -l app=webapp
```

2. Create a ClusterIP Service for the webapi Pod using the Kubernetes manifest in the exercise file and the `kubectl apply` command.

3. Remove the webapp Pod to have the Deployment create a new one. The reverse proxy on the webapp Pod needs to be restarted to be able to find the upstream host (webapi).

```
kubectl delete pod -l app=webapp
```

4. Check the logs of the webapp Pod again using the `kubectl logs` command and confirm that the problem is fixed.

5. Set up port forwarding for the webapp Pod using the `kubectl port-forward` command:

```
kubectl port-forward deployments/webapp 4200:80
```

6. Visit the webapp in your browser on http://localhost:4200 and confirm that the webap is now able to reach the webapi.

## 3. External traffic: Create a NodePort Service

- 📖 [Service documentation](https://kubernetes.io/docs/concepts/services-networking/service/)
- 🤔 _Exercise file: /Exercises/Kubernetes/3-Service-NodePort.yaml_
- 😏 _Solution file: /Solutions/Kubernetes/3-Service-NodePort.yaml_

> **NodePort** is a type of Service that you can use to listen for traffic coming into the cluster and direct it to a Pod. Using a NodePort Service, every node in the cluster will listen on the specified port and send traffic to the target port of the Pod.

Create a NodePort Service to listen for traffic coming into your cluster and direct it to the webapp Pod.

1. Edit the Kubernetes manifest in the exercise file and use the `kubectl apply` command to create the NodePort Service.

2. Visit the webapp in your browser, but this time without port-forwarding. The webapp should be exposed at http://localhost:30000. Confirm that it's working correctly.

## 4. Scaling applications: Scale out a Deployment

- 📖 [Deployment documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- 🤔 _Exercise file: /Exercises/Kubernetes/4-Deployment-Replicas.yaml_
- 😏 _Solution file: /Solutions/Kubernetes/4-Deployment-Replicas.yaml_

> You may want to scale a Deployment to keep up with increasing traffic. Horizontally scaling is accomplished by changing the number of **replicas**.

Scale out the webapi Deployment to two replicas.

1. Edit the Kubernetes manifest in the exercise file and use the `kubectl apply` command to update and scale the Deployment.

2. Use the `kubectl describe` command to get a detailed description of the Deployment and confirm that the number of desired replicas is set to 2:

```
kubectl describe deployment webapi
```

3. List the webapi Pods and confirm that there are two replicas running:

```
kubectl get pods -l app=webapi
```

4. Visit the webapp in your browser, repeatedly send requests to the webapi and examine the responses. There are now two Pods that match the label selector of the ClusterIP Service, hence the Service uses load balancing to distribute traffic to both Pods.

5. Scale in again to one replica using the `kubectl scale` command:

```
kubectl scale deployment webapi --replicas=1
```

6. List the webapi Pods again and confirm that there is only one Pod running.

## 5. Health checks: Configure a Liveness Probe

- 📖 [Liveness, Readiness and Startup Probes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- 🤔 _Exercise file: /Exercises/Kubernetes/5-Deployment-Liveness-Probe.yaml_
- 😏 _Solution file: /Solutions/Kubernetes/5-Deployment-Liveness-Probe.yaml_

> Kubernetes provides different types of probes to check the health of your application and act upon it. A **Liveness Probe** is used to restart a container when it's in a broken state (e.g. in case of a deadlock).

Configure a Liveness probe for your webapi Deployment.

1. Check the Kubernetes manifest in the exercise file to see how a Liveness Probe is configured and update your webapi using the `kubectl apply` command.

2. Visit the webapp in your browser via the NodePort Service. The webapp will load, but it will not be able reach the webapi.

3. Find out what's happening with the webapi Pod by executing the following command:

```
kubectl describe pod -l app=webapi
```

4. Edit the Kubernetes manifest in the exercise file to fix the issue and update your Deployment again using `kubectl apply`. Confirm that the issue is fixed.

## 6. Configuration: Create a ConfigMap

- 📖 [ConfigMap documentation](https://kubernetes.io/docs/concepts/configuration/configmap/)
- 🤔 _Exercise files:_
  - _/Exercises/Kubernetes/6-1-ConfigMap-Environment-Variable.yaml_
  - _/Exercises/Kubernetes/6-2-ConfigMap-File.yaml_

> A **ConfigMap** is a storage unit intended for small amounts of non-confidential data. This data can be consumed by Pods as environment variables or files.

Create a ConfigMap to provide configuration data for your webapi Pod as environment variables overriding the default loglevel.

1. Visit the webapp in your browser and send some requests to the webapi.

2. Use the `kubectl logs` command to check the logs of the webapi. No trace logs will be visible because the default loglevel is set to 'Information'.

```
kubectl logs deployments/webapi
```

3. Create a ConfigMap for the webapi consisting of key-value pair data by using the `kubectl apply` command with the Kubernetes manifest in the first exercise file. The ConfigMap contains a key-value pair to override and set the default logging level to 'Trace'.

4. Use the `kubectl describe` command to get a detailed description of the ConfigMap, including the key-value pair data:

```
kubectl describe configmap webapi-logging-config
```

5. Consume the ConfigMap as environment variables by uncommenting the updated Deployment manifest in the first exercise file and using the `kubectl apply` command again.

6. Visit the webapp in your browser and send some more requests to the webapi.

7. Check the logs using the `kubectl logs` command and confirm that you can see a trace log for each webapi request.

Create a ConfigMap to provide configuration data for your webapi Pod as a JSON file overriding the default response message.

1. Create a ConfigMap for the webapi containing JSON data by using the `kubectl apply` command with the Kubernetes manifest in the second exercise file. The ConfigMap contains JSON data to override the default response message.

2. Use the `kubectl describe` command to check the JSON data that's stored in the ConfigMap.

3. Create a volume from the ConfigMap and mount it to the container file system by uncommenting the updated Deployment manifest in the second exercise file and using the `kubectl apply` command again.

4. Get a shell to the running webapi container using the following command:

```
kubectl exec -it deployments/webapi -- /bin/bash
```

5. Explore the file system and see if you can find and read the contents of the JSON file that you mounted to the container. The Kubernetes manifest you've just applied should help you to find the path to where the file is stored.

6. Visit the webapp in your browser and send a new request to the webapi. Confirm that the webapi replies with the new response message.
