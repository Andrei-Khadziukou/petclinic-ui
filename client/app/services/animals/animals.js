class animalsService {
  constructor($http, $q) {
    "ngInject";
    //INIT DEPENDENCIES
    this.$http = $http;
    this.$q = $q;
  }

  getData() {
    const defer = this.$q.defer();
    this.$http
      .get("http://localhost:8082/animals/")
      .then(response => {
        const data = response.data;
        defer.resolve(data);
      })
      .catch(response => {
        defer.reject(response.statusText);
      });

    return defer.promise;
  }
}

export default animalsService;
