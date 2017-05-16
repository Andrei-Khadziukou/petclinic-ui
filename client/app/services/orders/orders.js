class ordersService {
  constructor($http, $q) {
    "ngInject";
    //INIT DEPENDENCIES
    this.$http = $http;
    this.$q = $q;
  }

  getData(animal, services) {
    const defer = this.$q.defer();

    if (!animal || !services || (services && services.length === 0)) {
      return this.$q.reject();
    }

    const query = `animalId=${animal}&serviceIds=${services.join(",")}`;
    this.$http
      .get(`http://localhost:8082/clinics/by-animal-services?${query}`)
      .then(response => {
        this.$q
          .all(
            response.data.map(id =>
              this.$http.get(`http://localhost:8082/clinics/${id}`)
            )
          )
          .then(responses =>
            defer.resolve(responses.map(response => response.data))
          );
      })
      .catch(response => {
        defer.reject(response.statusText);
      });

    return defer.promise;
  }
}

export default ordersService;
