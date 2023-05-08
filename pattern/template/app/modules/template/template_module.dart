import 'package:flutter_modular/flutter_modular.dart';
import 'template_controller.dart';
import 'template_page.dart';

///Binds [TemplateController] to [TemplatePage].
class TemplateModule extends Module {
  @override
  final List<Bind> binds = [
    Bind((i) => TemplateController()),
  ];
  
  @override
  final List<ModularRoute> routes = [
    ChildRoute('/', child: (_, args) => const TemplatePage()),
  ];
}
