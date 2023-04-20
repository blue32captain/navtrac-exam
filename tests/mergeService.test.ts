const MergeService = require("../mergeService");

const mergeService = new MergeService.MergeService();
test("initial add", () => {
  mergeService.merge({
    id: 1,
    time: "22:20",
    dir: "O",
    vehicle: {
      lp: "X1234",
      type: "Tractor",
      dot: "",
      num: "",
      dam: "",
    },
    trailer: {
      type: "Cont",
      lp: "421664Y",
      chassis: "NGLT920920",
      number: "TRHU7402058",
      si: "Y",
      dam: "",
    },
  });
  expect(mergeService.observations.length).toBe(1);
});

test("add observation to be added(time out)", () => {
  mergeService.merge({
    id: 2,
    time: "22:40",
    dir: "O",
    vehicle: {
      lp: "X1234",
      type: "Tractor",
      dot: "",
      num: "",
      dam: "",
    },
    trailer: {
      type: "Cont",
      lp: "421664Y",
      chassis: "NGLT920920",
      number: "TRHU7402058",
      si: "Y",
      dam: "",
    },
  });
  expect(mergeService.observations.length).toBe(2);
});

test("add observation to be added(vehicle lp different)", () => {
  mergeService.merge({
    id: 3,
    time: "22:40",
    dir: "O",
    vehicle: {
      lp: "X1235",
      type: "Tractor",
      dot: "",
      num: "",
      dam: "",
    },
    trailer: {
      type: "Cont",
      lp: "421664Y",
      chassis: "NGLT920920",
      number: "TRHU7402058",
      si: "Y",
      dam: "",
    },
  });
  expect(mergeService.observations.length).toBe(3);
});

test("add observation to be duplicated(time in)", () => {
  mergeService.merge({
    id: 4,
    time: "22:30",
    dir: "O",
    vehicle: {
      lp: "X1235",
      type: "Tractor",
      dot: "",
      num: "",
      dam: "",
    },
    trailer: {
      type: "Cont",
      lp: "421664Y",
      chassis: "NGLT920920",
      number: "TRHU7402058",
      si: "Y",
      dam: "",
    },
  });
  expect(mergeService.observations.length).toBe(3);
});

test("add observation to be added(dir different)", () => {
  mergeService.merge({
    id: 5,
    time: "22:30",
    dir: "I",
    vehicle: {
      lp: "X1235",
      type: "Tractor",
      dot: "",
      num: "",
      dam: "",
    },
    trailer: {
      type: "Cont",
      lp: "421664Y",
      chassis: "NGLT920920",
      number: "TRHU7402058",
      si: "Y",
      dam: "",
    },
  });
  expect(mergeService.observations.length).toBe(4);
});
