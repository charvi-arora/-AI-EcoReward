import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View style={styles.center} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>📷 Camera Access</Text>

        <Text style={styles.permissionText}>
          AI EcoReward needs your camera to identify waste.
        </Text>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <View style={styles.overlay}>
          <Text style={styles.title}>Scan your waste ♻️</Text>

          <Text style={styles.subtitle}>
            Place the waste inside the frame
          </Text>

          <View style={styles.scanFrame} />

          <TouchableOpacity style={styles.captureButton}>
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF8',
  },

  center: {
    flex: 1,
  },

  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#FFFDF8',
  },

  permissionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#236B3A',
    marginBottom: 14,
  },

  permissionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#5B655D',
    marginBottom: 25,
  },

  permissionButton: {
    backgroundColor: '#FF8DB6',
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  camera: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },

  subtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
  },

  scanFrame: {
    width: 280,
    height: 280,
    borderWidth: 4,
    borderColor: '#FFE36E',
    borderRadius: 30,
    marginTop: 50,
  },

  captureButton: {
    position: 'absolute',
    bottom: 45,
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF8DB6',
  },
});