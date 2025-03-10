import { FontAwesome6 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  birthDate: Yup.date().required("Date of birth is required"),
  phone: Yup.number().required("Phone number is required"),
});

export default function Index() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dataTemp, setDataTemp] = useState({});

  const handleSubmit = (values: any, actions: any) => {
    actions.setSubmitting(false);
    const trimmedValues = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      phone: values.phone.trim(),
    };
    setDataTemp(trimmedValues);
    actions.resetForm();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formik And Yup</Text>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          birthDate: new Date(),
          phone: "",
        }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                onBlur={props.handleBlur("name")}
                placeholder="Enter your name"
              />
              {props.errors.name && (
                <Text style={styles.errorText}>{props.errors.name}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              {props.errors.email && (
                <Text style={styles.errorText}>{props.errors.email}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
                placeholder="Enter your password"
                secureTextEntry
              />
              {props.errors.password && (
                <Text style={styles.errorText}>{props.errors.password}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text>Phone</Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange("phone")}
                value={props.values.phone.toString()}
                onBlur={props.handleBlur("phone")}
                keyboardType="numeric"
              />
              {props.touched.phone && props.errors.phone && (
                <Text style={styles.errorText}>{props.errors.phone}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                // style={styles.input}
                onPress={() => {
                  setShowDatePicker(true);
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Select your date of birth"
                  editable={false}
                  value={props.values.birthDate.toLocaleDateString()}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  minimumDate={new Date("2025-01-01")}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      props.setFieldValue("birthDate", selectedDate);
                    }
                  }}
                />
              )}
            </View>
            <FontAwesome6.Button name="arrow-right" onPress={props.handleSubmit}>
              {props.isSubmitting ? "Submitting..." : "Submit"}
            </FontAwesome6.Button>
            <Text>{JSON.stringify(props, null, 2)}</Text>
          </>
        )}
      </Formik>
      <Text style={styles.debugText}>{JSON.stringify(dataTemp, null, 2)}</Text>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 40,
    paddingBottom: 20, // Añadí un poco de padding para evitar que se pegue al borde inferior
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: Dimensions.get("window").width * 0.8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    marginVertical: 10,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  debugText: {
    marginVertical: 50,
    fontSize: 12,
    color: "green",
  },
  localStoreText: {
    marginTop: 20,
    fontSize: 14,
    color: "green",
  },
});
