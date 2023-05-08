import 'package:branvier/branvier.dart';
import 'package:flutter_modular/flutter_modular.dart';

import '../../../services/app/auth_service.dart';

class MainController extends ReassemblePath {
  //Denpendencies
  AuthService get _auth => Modular.get();

  //
  void onLogout() {
    _auth.logout();
    Modular.to.navigate('/auth/');
  }
}
