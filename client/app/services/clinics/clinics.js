class clinicsService {
  constructor($http, $q) {
    "ngInject";
    //INIT DEPENDENCIES
    this.$http = $http;
    this.$q = $q;
  }

  getData() {
    const defer = this.$q.defer();
    this.$http
      .get("http://localhost:8082/clinics/")
      .then(response => {
        const data = response.data;
        defer.resolve(data);
      })
      .catch(response => {
        defer.reject(response.statusText);
      });
    return defer.promise;
  }

  create(data) {
    const defer = this.$q.defer();
    this.$http
      .post("http://localhost:8082/clinics/", data)
      .then(() => defer.resolve())
      .catch(() => defer.reject());

    return defer.promise;
  }

  update(data, id) {
    const defer = this.$q.defer();
    this.$http
      .put(`http://localhost:8082/clinics/${id}`, data)
      .then(() => defer.resolve())
      .catch(() => defer.reject());

    return defer.promise;
  }

  delete(id) {
    const defer = this.$q.defer();
    this.$http
      .delete(`http://localhost:8082/clinics/${id}`)
      .then(() => defer.resolve())
      .catch(() => defer.reject());

    return defer.promise;
  }
}

export default clinicsService;
