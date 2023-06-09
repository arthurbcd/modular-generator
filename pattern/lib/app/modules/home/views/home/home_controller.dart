import 'package:asp/asp.dart';

class HomeController {
  //States
  final _count = Atom(42);

  //Getters
  String get count => _count.value.toString();

  /// Increment counter.
  void onIncrement() => _count.value++;
}
